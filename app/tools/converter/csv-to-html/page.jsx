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

const currentTool = 'csv-to-html';
const rows = 10;

const initialRemoteFile = { status: false, protocol: 'http://', url: '' };

export default function CsvToHtml() {
	const [useTabs, setUseTabs] = useState('');
	const [tabSpace, setTabSpace] = useState(2);
	const [remoteFile, setRemoteFile] = useState(initialRemoteFile);

	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } =
		useUtToolsHistory();

	// Helper function to format HTML with customizable indentation and new lines
	const formatHtml = (html) => {
		let formatted = '';
		let pad = 0;

		// Determine indentation based on user preference
		const indent = useTabs ? '\t' : ' '.repeat(tabSpace);

		// Split HTML and format with chosen indentation
		html.split(/>\s*</).forEach((node) => {
			if (node.match(/^\/\w/)) pad -= 1;
			formatted += indent.repeat(pad) + '<' + node + '>\r\n';
			if (node.match(/^<?\w[^>]*[^/]$/) && !node.startsWith('input')) pad += 1;
		});

		return formatted.trim();
	};

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

	const handleConversion = (csvString = false) => {
		let csvText = inputValue;
		clearError();

		if (csvString !== false) {
			csvText = csvString;
			setInputValue(csvString);

			// if (!autoSync.input) return;
		}

		if (!csvText) return;

		// Parse CSV input using PapaParse
		Papa.parse(csvText, {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				if (results.data.length === 0) {
					addError({ type: 'input', message: 'No data to convert.' });
					return;
				}

				const columns = Object.keys(results.data[0]);

				// Create a new HTML document fragment
				const doc = document.implementation.createHTMLDocument('');
				const table = doc.createElement('table');
				table.style.borderCollapse = 'collapse';
				table.style.width = '100%';

				// Create the table header
				const thead = doc.createElement('thead');
				const headerRow = doc.createElement('tr');

				columns.forEach((col) => {
					const th = doc.createElement('th');
					th.textContent = col;
					headerRow.appendChild(th);
				});

				thead.appendChild(headerRow);
				table.appendChild(thead);

				// Create the table body
				const tbody = doc.createElement('tbody');

				results.data.forEach((row) => {
					const tr = doc.createElement('tr');

					columns.forEach((col) => {
						const td = doc.createElement('td');
						td.textContent = row[col] != null ? row[col] : ''; // Handle null or undefined values
						tr.appendChild(td);
					});

					tbody.appendChild(tr);
				});

				table.appendChild(tbody);

				// Serialize the table to a formatted string
				const serializer = new XMLSerializer();
				const unformattedHtmlTable = serializer.serializeToString(table);

				// Format the HTML with spaces and new lines
				let formattedHtmlTable = formatHtml(unformattedHtmlTable);

				// Fix for double angle brackets in serialized table
				formattedHtmlTable = formattedHtmlTable.replace(/^<<table/, '<table');
				formattedHtmlTable = formattedHtmlTable.replace(/<\/table>>$/, '</table>');

				setOutputValue(formattedHtmlTable);

				// Adding history for formatted HTML table conversion
				addToHistory(inputValue, formattedHtmlTable);
			},
			error: function (error) {
				addError({ type: 'input', message: error.message });
			},
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
			title='CSV to HTML Converter'
			description='Easily convert your CSV data with HTML.'
			aside={true}
		>
			<ToolBoxWrapper>
				{/* First column */}
				<ToolBoxColumnWrapper error={error.input}>
					<ColumnInputsWrapper error={error.input}>
						<UtTextarea
							label='CSV'
							description='Enter CSV data to convert'
							rows={rows}
							className={showQRCode.input && qrValues.input?.length ? 'active-qr' : ''}
							placeholder='Enter CSV data to convert'
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
									accept='.csv'
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
