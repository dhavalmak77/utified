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
import { Checkbox } from '@mantine/core';
import { XMLParser } from 'fast-xml-parser';
import { parseStringPromise } from 'xml2js';

const currentTool = 'xml-to-tsv';
const rows = 10;

const initialRemoteFile = { status: false, protocol: 'http://', url: '' };

const convertXMLToTSV = async (xmlString) => {
	try {
		const result = await parseStringPromise(xmlString);

		const objectToTSV = (obj, parentKey = '') => {
			const rows = [];

			for (const [key, value] of Object.entries(obj)) {
				// Construct the new key without duplicating 'root'
				const newKey = parentKey ? `${parentKey}.${key}` : key;

				if (Array.isArray(value)) {
					value.forEach((item) => {
						if (typeof item === 'object') {
							rows.push(...objectToTSV(item, newKey));
						} else {
							rows.push(`${newKey}\t${item}`);
						}
					});
				} else if (typeof value === 'object') {
					rows.push(...objectToTSV(value, newKey));
				} else {
					rows.push(`${newKey}\t${value}`);
				}
			}

			return rows;
		};

		const tsvRows = objectToTSV(result);
		return tsvRows.join('\n');
	} catch (error) {
		console.error('Error parsing XML:', error);
		return 'Error parsing XML';
	}
};

export default function XmlToTsv() {
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

	const handleConversion = async () => {
		const tsv = await convertXMLToTSV(inputValue);
		setOutputValue(tsv);

		addToHistory(inputValue, tsv);
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
			title='XML to TSV Converter'
			description='Easily convert your XML data with TSV.'
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
							label='TSV'
							description='Converted TSV will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output?.length ? 'active-qr' : ''}
							placeholder='Converted TSV will appear here'
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
