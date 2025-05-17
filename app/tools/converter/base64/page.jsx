'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import { useCallback, useState } from 'react';
import { useUtToolsHistory } from '@/app/_hooks';
import {
	AutoSyncCheckbox,
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
	UploadFileButton,
	UtTextarea,
} from '@/app/_components/common';
import { Select } from '@mantine/core';
import { CHARSET_OPTIONS } from './charsets';
import { base64Conversions } from './charset-conversions';

const currentTool = 'SHA1';
const rows = 5;

const defaultOption = {
	label: 'UTF-8 (Deafult)',
	value: '',
};

export default function SHA1() {
	const [selectedCharset, setSelectedCharset] = useState({ conversionType: '', charset: '', title: '', input: '', output: '' });
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } = useUtToolsHistory();

	const handleConversion = useCallback(
		(conversionType, inputText) => {
			clearError();

			if (conversionType === 'input') {
				setInputValue(inputText);

				if (selectedCharset.conversionType === 'input' && selectedCharset.charset) {
					const encoded = base64Conversions('input', inputText, selectedCharset.charset);
					if (encoded.status) {
						console.log('ENCODED', encoded);
						setOutputValue(encoded.data);
					} else {
						addError({ type: 'input', message: encoded.data });
						setOutputValue('');
					}
				} else {
					try {
						const encodedText = btoa(inputText);
						setOutputValue(encodedText);
					} catch (error) {
						const errorMessage = error.message.split(':').pop().trim();
						addError({ type: 'input', message: errorMessage });
						setOutputValue('');
					}
				}
			} else {
				setOutputValue(inputText);

				if (selectedCharset.conversionType === 'output' && selectedCharset.charset) {
					const decoded = base64Conversions('output', inputText, selectedCharset.charset);
					if (decoded.status) {
						setInputValue(decoded.data);
					} else {
						addError({ type: 'output', message: decoded.data });
						setInputValue('');
					}
				} else {
					try {
						const decodedText = atob(inputText);
						setInputValue(decodedText);
					} catch (error) {
						const errorMessage = error.message.split(':').pop().trim();
						addError({ type: 'output', message: errorMessage });
						setInputValue('');
					}
				}
			}
		},
		[selectedCharset]
	);

	const handleCharsetChange = (type, value, option) => {
		setSelectedCharset({
			conversionType: type,
			charset: value,
			// title: option.label,
			input: type === 'input' ? value : '',
			output: type === 'output' ? value : '',
		});
	};

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (type === 'input') {
					setInputValue(e.target.result);
				} else {
					setOutputValue(e.target.result);
				}

				if (autoSync) {
					handleConversion(type, e.target.result);
				}
			};
			reader.readAsText(file);
		},
		[handleConversion]
	);

	return (
		<PageWrapper
			title='Base64 Hash Generator'
			description='Generate Base64 hash.'
			aside={true}
		>
			<ToolBoxWrapper>
				{/* First column */}
				<ToolBoxColumnWrapper error={error.input}>
					<ColumnInputsWrapper error={error.input}>
						<UtTextarea
							label='Base64 Encode'
							description='Enter text to encode'
							rows={rows}
							className={showQRCode.input && qrValues.input?.length ? 'active-qr' : ''}
							placeholder='Write text or upload a file'
							value={inputValue}
							setValue={setInputValue}
							onChange={(e) => {
								if (autoSync.input) {
									handleConversion('input', e.target.value);
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
									title='Encode'
									onClick={() => handleConversion('input', inputValue)}
									loading={loading}
								/>
								<AutoSyncCheckbox
									label='Auto Encode'
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
								<Select
									placeholder='Pick a charset'
									data={[defaultOption, ...CHARSET_OPTIONS]}
									comboboxProps={{ dropdownPadding: 5 }}
									onChange={(value) => handleCharsetChange('input', value)}
									allowDeselect={false}
									searchable
								/>
								<UploadFileButton onChange={(e) => handleFileUpload('input', e)} />
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
							label='Base64 Decode'
							description='Converted text will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output?.length ? 'active-qr' : ''}
							placeholder='Converted text will appear here'
							value={outputValue}
							setValue={setOutputValue}
							onChange={(e) => {
								if (autoSync.output) {
									handleConversion('output', e.target.value);
								}
								setOutputValue(e.target.value);
							}}
							// error={error.output}
						/>
						{showQRCode.output && (
							<QRCode
								rows={rows}
								value={qrValues.output}
								onClick={() => toggleQRCode('output')}
							/>
						)}
					</ColumnInputsWrapper>

					<ColumnSettingsWrapper error={error.output}>
						<CommonGroup justifyBetween>
							<CommonGroup>
								<SubmitButton
									title='Decode'
									onClick={() => handleConversion('output', outputValue)}
									loading={loading}
								/>
								<AutoSyncCheckbox
									label='Auto Decode'
									checked={autoSync.output}
									onChange={(e) => toggleAutoSync('output', e.target.checked)}
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
								<Select
									placeholder='Pick a charset'
									data={[defaultOption, ...CHARSET_OPTIONS]}
									comboboxProps={{ dropdownPadding: 5 }}
									onChange={(value) => handleCharsetChange('output', value)}
									allowDeselect={true}
									searchable
								/>
								<UploadFileButton onChange={(e) => handleFileUpload('output', e)} />
							</CommonGroup>
							<CommonGroup>
								<QRCodeButton
									display={showQRCode.output}
									onClick={() => toggleQRCode('output')}
								/>
							</CommonGroup>
						</CommonGroup>
					</ColumnSettingsWrapper>
				</ToolBoxColumnWrapper>
			</ToolBoxWrapper>
		</PageWrapper>
	);
}
