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
import { Checkbox, NumberInput, Text } from '@mantine/core';
import cn from '@/app/_lib/utils/cn';

const currentTool = 'json-to-html';
const rows = 10;

const initialRemoteFile = { status: false, protocol: 'http://', url: '' };

export default function JsonToHtml() {
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

	// Helper function to format HTML with indentation and new lines
	const formatHtml = (html) => {
		let formatted = '';
		let pad = 0;
		html.split(/>\s*</).forEach((node) => {
			if (node.match(/^\/\w/)) pad -= 1;
			formatted += new Array(pad + 1).join('  ') + '<' + node + '>\r\n';
			if (node.match(/^<?\w[^>]*[^/]$/) && !node.startsWith('input')) pad += 1;
		});
		return formatted.trim();
	};

	// Function to handle conversion
	const handleConversion = () => {
		clearError();
		
		try {
			// Parse JSON input
			const jsonData = JSON.parse(inputValue);

			// Flatten JSON and convert to HTML table
			let dataToConvert = [];
			if (Array.isArray(jsonData)) {
				dataToConvert = jsonData.map((item) => flattenJson(item));
			} else if (typeof jsonData === 'object' && jsonData !== null) {
				dataToConvert = [flattenJson(jsonData)];
			} else {
				addError({ type: 'input', message: 'Invalid JSON format.' });
				return;
			}

			// Generate HTML table
			const columns = Array.from(new Set(dataToConvert.flatMap(Object.keys)));
			let html = '<table border="1" style="border-collapse: collapse; width: 100%;">';

			// Table header
			html += '<thead><tr>';
			columns.forEach((col) => (html += `<th>${col}</th>`));
			html += '</tr></thead>';

			// Table body
			html += '<tbody>';
			dataToConvert.forEach((row) => {
				html += '<tr>';
				columns.forEach((col) => {
					html += `<td>${row[col] != null ? row[col] : ''}</td>`;
				});
				html += '</tr>';
			});
			html += '</tbody></table>';

			// Format the HTML with spaces and new lines
			let formattedHtml = formatHtml(html);

			// Fix for double angle brackets in serialized table
			formattedHtml = formattedHtml.replace(/^<<table/, '<table');
			formattedHtml = formattedHtml.replace(/<\/table>>$/, '</table>');

			setOutputValue(formattedHtml);

			addToHistory(inputValue, formattedHtml);
		} catch (e) {
			console.log(e);
			addError({ type: 'input', message: 'Invalid JSON input.' });
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
			title='JSON to HTML Converter'
			description='Convert JSON data to HTML easily.'
			aside={true}
		>
			<ToolBoxWrapper>
				{/* First column */}
				<ToolBoxColumnWrapper error={error.input}>
					<ColumnInputsWrapper error={error.input}>
						<UtTextarea
							label='JSON'
							description='Enter JSON to convert'
							rows={rows}
							className={showQRCode.input && qrValues.input?.length ? 'active-qr' : ''}
							placeholder='Enter JSON or upload a file'
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
									accept='.json'
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
							label='HTML'
							description='Converted HTML will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output?.length ? 'active-qr' : ''}
							placeholder='Converted HTML will appear here'
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
