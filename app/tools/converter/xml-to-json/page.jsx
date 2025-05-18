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
import { Checkbox, NumberInput, Text } from '@mantine/core';
import { XMLParser } from 'fast-xml-parser';
import xml2js from 'xml2js';
import cn from '@/app/_lib/utils/cn';

const currentTool = 'xml-to-json';
const rows = 10;

const initialRemoteFile = { status: false, protocol: 'http://', url: '' };

// Helper function to recursively trim whitespace from all string values in an object
const trimObject = (obj) => {
	if (typeof obj === 'string') {
		return obj.trim();
	} else if (typeof obj === 'object' && obj !== null) {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			acc[key] = trimObject(value);
			return acc;
		}, Array.isArray(obj) ? [] : {});
	}
	return obj;
};

export default function XmlToHtml() {
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

	// Function to convert XML to JSON
	const handleConversion = () => {
		clearError();

		const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
		parser.parseString(inputValue, (err, result) => {
			if (err) {
				setError({ type: 'input', message: 'Invalid XML format.'});
				setOutputValue('');
			} else {
				// Trim whitespace from the parsed object
				const trimmedResult = trimObject(result);
				const space = useTabs ? '\t' : Number(tabSpace);

				let parsedObject;
				if (typeof trimmedResult === 'string') {
					parsedObject = eval('(' + trimmedResult + ')');
				} else {
					parsedObject = trimmedResult;
				}

				const jsonString = JSON.stringify(trimmedResult, null, space);

				setOutputValue(jsonString); // Convert object to formatted JSON string
				addToHistory(inputValue, jsonString);
			}
		});
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
			title='XML to JSON Converter'
			description='Easily convert your XML data with JSON.'
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
							label='JSON'
							description='Converted JSON will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output?.length ? 'active-qr' : ''}
							placeholder='Converted JSON will appear here'
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
							<Checkbox
								label='Use tabs'
								checked={useTabs}
								onChange={(e) => setUseTabs(e.target.checked)}
								style={{ alignSelf: 'center' }}
							/>
							<NumberInput
								value={tabSpace}
								min={1}
								max={16}
								onChange={(value) => setTabSpace((prev) => (!value ? prev : Math.floor(value)))}
								step={1}
								className={cn('w-[115px]')}
								rightSection={
									<Text
										size='sm'
										className={cn('text-right')}
										// c='black'
									>
										Indent size
									</Text>
								}
								rightSectionWidth={70}
								rightSectionProps={{ style: { margin: 'auto -10px', left: 45 } }}
								// w={115}
								miw={95}
								// variant='transparent'
								hideControls
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
						<CommonGroup>
							<UndoRedoButtons
								onUndo={undo}
								onRedo={redo}
								canUndo={canUndo}
								canRedo={canRedo}
							/>
						</CommonGroup>
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
