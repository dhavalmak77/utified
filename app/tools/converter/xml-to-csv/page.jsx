'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { useUtToolsHistory } from '@/app/_hooks';
import {
	ColumnInputsWrapper,
	ColumnSettingsWrapper,
	CommonGroup,
	CopyButton,
	DownloadButton,
	QRCode,
	QRCodeButton,
	SettingsButton,
	SubmitButton,
	ToolBoxColumnWrapper,
	ToolBoxWrapper,
	UndoRedoButtons,
	UploadFileButton,
	UtTextarea,
} from '@/app/_components/common';
import Papa from 'papaparse';
import { Checkbox } from '@mantine/core';
import { XMLParser } from 'fast-xml-parser';

const currentTool = 'xml-to-csv';
const rows = 10;

const initialRemoteFile = { status: false, protocol: 'http://', url: '' };

export default function XmlToCsv() {
	const parser = new XMLParser();
	const [useTabs, setUseTabs] = useState('');
	const [tabSpace, setTabSpace] = useState(2);
	const [remoteFile, setRemoteFile] = useState(initialRemoteFile);

	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } =
		useUtToolsHistory();

	useEffect(() => {
		if (autoSync.input) {
			handleConversion();
		}
	}, [inputValue, useTabs, tabSpace, autoSync]);

	useEffect(() => {
		if (!autoSync.input) {
			handleConversion();
		}
	}, [useTabs, tabSpace]);

	// Helper function to flatten nested JSON objects
	const flattenJson = (obj, prefix = '') => {
		let result = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				const newKey = prefix ? `${prefix}.${key}` : key;
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					Object.assign(result, flattenJson(value, newKey));
				} else if (Array.isArray(value)) {
					result[newKey] = JSON.stringify(value); // Convert arrays to JSON strings
				} else {
					result[newKey] = value;
				}
			}
		}
		return result;
	};

	const xmlToCsv = (xmlString) => {
		// Step 1: Parse the XML into a JavaScript object
		const options = {
			ignoreAttributes: false,
			attributeNamePrefix: '',
			parseAttributeValue: true,
		};

		let jsonObj;
		try {
			jsonObj = parser.parse(xmlString, options);
		} catch (error) {
			console.log('error', error);
			return { error: 'Invalid XML format' };
		}

		// Step 2: Flatten the JSON object into an array of records
		const flattenObject = (obj, parent = '', res = {}) => {
			for (let key in obj) {
				const propName = parent ? `${parent}_${key}` : key;
				if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
					flattenObject(obj[key], propName, res);
				} else {
					res[propName] = obj[key];
				}
			}
			return res;
		};

		const records = [];
		if (Array.isArray(jsonObj)) {
			jsonObj.forEach((item) => {
				records.push(flattenObject(item));
			});
		} else {
			records.push(flattenObject(jsonObj));
		}

		// Step 3: Convert the records array into CSV format using PapaParse
		const csv = Papa.unparse(records);

		return { csv };
	};

	const handleConversion = () => {
		clearError();
		const { csv, error } = xmlToCsv(inputValue);

		if (error) {
			addError({ type: 'input', message: error });
		} else {
			setOutputValue(csv);
		}
	};

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setInputValue(e.target.result);

				if (autoSync.input) {
					handleConversion(e.target.result);
				}
			};
			reader.readAsText(file);
		},
		[handleConversion, autoSync]
	);

	return (
		<PageWrapper
			title='XML to CSV Converter'
			description='Easily convert your XML data with CSV.'
			aside={true}
		>
			<ToolBoxWrapper>
				{/* First column */}
				<ToolBoxColumnWrapper error={error.input}>
					<ColumnInputsWrapper error={error.input}>
						<UtTextarea
							label='XML'
							description='Enter XML data to convert'
							rows={rows}
							className={showQRCode.input && qrValues.input?.length ? 'active-qr' : ''}
							placeholder='Enter XML data to convert'
							value={inputValue}
							setValue={setInputValue}
							onChange={(e) => {
								if (autoSync.input) {
									handleConversion(e.target.value);
								}
								setInputValue(e.target.value);
							}}
						/>
						{showQRCode.input && (
							<QRCode
								rows={rows}
								value={qrValues.input}
								onClick={() => toggleQRCode('input')}
							/>
						)}
					</ColumnInputsWrapper>

					<ColumnSettingsWrapper error={error.output}>
						<CommonGroup justifyBetween>
							<CommonGroup>
								<SubmitButton
									title='Convert'
									onClick={() => handleConversion(inputValue)}
									loading={loading}
									disabled={loading || autoSync.input}
								/>
								<Checkbox
									label='Auto Convert'
									checked={autoSync.input}
									onChange={(e) => toggleAutoSync('input', e.target.checked)}
								/>
							</CommonGroup>
							<CommonGroup>
								<SettingsButton
									display={settings.input}
									onClick={() => toggleSettings('input')}
								/>
								<CopyButton
									textToCopy={inputValue}
									disabled={!inputValue}
								/>
								<DownloadButton
									data={inputValue}
									disabled={!inputValue}
									fileExtension='txt'
									fileNamePrefix={currentTool + '_input'}
								/>
							</CommonGroup>
						</CommonGroup>
						<CommonGroup
							justifyBetween
							hidden={!settings.input}
						>
							<CommonGroup>
								<UploadFileButton
									onChange={(e) => handleFileUpload('input', e)}
									accept='.xml'
								/>
							</CommonGroup>

							<CommonGroup>
								<QRCodeButton
									display={showQRCode.input}
									onClick={() => toggleQRCode('input')}
								/>
							</CommonGroup>
						</CommonGroup>
					</ColumnSettingsWrapper>
				</ToolBoxColumnWrapper>

				{/* Second column */}
				<ToolBoxColumnWrapper error={error.output}>
					<ColumnInputsWrapper error={error.output}>
						<UtTextarea
							label='CSV'
							description='Converted CSV will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output?.length ? 'active-qr' : ''}
							placeholder='Converted CSV will appear here'
							value={outputValue}
							setValue={setOutputValue}
							onChange={(e) => {
								if (autoSync.output) {
									handleConversion(e.target.value);
								}
								setOutputValue(e.target.value);
							}}
							style={{ tabSize: useTabs ? tabSpace : undefined }}
							error={error.output}
						/>
						{showQRCode.output && (
							<QRCode
								rows={rows}
								value={qrValues.output}
								onClick={() => toggleQRCode('output')}
							/>
						)}
					</ColumnInputsWrapper>

					<CommonGroup justifyBetween>
						<CommonGroup>
							<UndoRedoButtons
								onUndo={undo}
								onRedo={redo}
								canUndo={canUndo}
								canRedo={canRedo}
							/>
						</CommonGroup>
						<CommonGroup>
							<SettingsButton
								display={settings.output}
								onClick={() => toggleSettings('output')}
							/>
							<CopyButton
								textToCopy={outputValue}
								disabled={!outputValue}
							/>
							<DownloadButton
								data={outputValue}
								disabled={!outputValue}
								fileExtension='txt'
								fileNamePrefix={currentTool + '_output'}
							/>
						</CommonGroup>
					</CommonGroup>
					<CommonGroup
						justifyBetween
						hidden={!settings.output}
					>
						<CommonGroup></CommonGroup>
						<CommonGroup>
							<QRCodeButton
								display={showQRCode.output}
								onClick={() => toggleQRCode('output')}
							/>
						</CommonGroup>
					</CommonGroup>
				</ToolBoxColumnWrapper>
			</ToolBoxWrapper>
		</PageWrapper>
	);
}
