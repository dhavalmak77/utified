'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import { useCallback, useState } from 'react';
import { useDebounce, useUtToolsHistory } from '@/app/_hooks';
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
	UndoRedoButtons,
	UploadFileButton,
	UtTextarea,
} from '@/app/_components/common';
import generatePhpHash from '@/app/_lib/utils/generate-php-hash';
import { Select, Text } from '@mantine/core';

const currentTool = 'fnv';
const rows = 5;

const algorithms = [
	{ label: '132', value: '132' },
	{ label: '1a32', value: '1a32' },
	{ label: '164', value: '164' },
	{ label: '1a64', value: '1a64' },
];

export default function FNV() {
	const [algorithm, setAlgorithm] = useState('132');
	const { debounce } = useDebounce();
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } =
		useUtToolsHistory();

	const generateHash = (data) => {
		setLoading(true);

		debounce(
			'fnv',
			async () => {
				try {
					const resultHash = await generatePhpHash(`fnv${algorithm}`, data);

					if (resultHash.status === 'success') {
						setOutputValue(resultHash.data);
						clearError('');
						addToHistory(data, resultHash.data);
					} else {
						throw new Error(resultHash.data || 'Hash generation failed.');
					}
				} catch (error) {
					addError({ type: 'input', message: error.message });
				} finally {
					setLoading(false);
				}
			},
			autoSync['input'] ? 500 : 0
		);
	};

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setInput(e.target.result);

				if (autoSync) {
					generateHash(e.target.result);
				}
			};
			reader.readAsText(file);
		},
		[generateHash]
	);

	return (
		<PageWrapper
			title='FNV Hash Generator'
			description='Generate FNV hash.'
			aside={true}
		>
			<ToolBoxWrapper>
				{/* First column */}
				<ToolBoxColumnWrapper error={error.input}>
					<ColumnInputsWrapper error={error.input}>
						<UtTextarea
							label='Input'
							description='Enter text to convert'
							rows={rows}
							className={showQRCode.input && qrValues.input.length ? 'active-qr' : ''}
							placeholder='Write text or upload a file'
							value={inputValue}
							setValue={setInputValue}
							onChange={(e) => {
								if (autoSync.input) {
									generateHash(e.target.value);
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
									title='Generate'
									onClick={() => generateHash(inputValue)}
									loading={loading}
								/>
								<AutoSyncCheckbox
									label='Auto Generate'
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
									value={algorithm}
									placeholder='Pick a Algorithm'
									data={algorithms}
									comboboxProps={{ dropdownPadding: 5 }}
									onChange={(value) => setAlgorithm(value)}
									allowDeselect={false}
									searchable
									leftSection={
										<Text
											px={10}
											// c='black'
										>
											FNV
										</Text>
									}
									leftSectionWidth={50}
									w={120}
								/>
								<UploadFileButton onChange={(e) => handleFileUpload(e)} />
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
							label='fnv'
							description='Converted text will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output.length ? 'active-qr' : ''}
							placeholder='Converted text will appear here'
							value={outputValue}
							setValue={setOutputValue}
							onChange={(e) => {
								if (autoSync.output) {
									generateHash(e.target.value);
								}
								setOutputValue(e.target.value);
							}}
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
						<CommonGroup />
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