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
	UndoRedoButtons,
	UploadFileButton,
	UtTextarea,
} from '@/app/_components/common';
import { Select, Text } from '@mantine/core';
import generateMD6Hash from './generate-hash';

const currentTool = 'MD6';
const rows = 5;

const md6Sizes = [
	{ label: '32', value: '32' },
	{ label: '64', value: '64' },
	{ label: '128', value: '128' },
	{ label: '256', value: '256' },
	{ label: '512', value: '512' },
];

export default function MD6() {
	const [md6Size, setMd6Size] = useState('256');
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } = useUtToolsHistory();

	const generateHash = async (data) => {
		setLoading(true);

		try {
			let resultHash = await generateMD6Hash(data, Number(md6Size));
			setOutputValue(resultHash);
			clearError();
			addToHistory(data, resultHash);
		} catch (error) {
			addError({ type: 'input', message: error.message });
		} finally {
			setLoading(false);
		}
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
			title='MD6 Hash Generator'
			description='Generate MD6 hash.'
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
									value={md6Size}
									placeholder='Pick a Size'
									data={md6Sizes}
									comboboxProps={{ dropdownPadding: 5 }}
									onChange={(value) => setMd6Size(value)}
									allowDeselect={false}
									searchable
									leftSection={
										<Text
											px={10}
											// c='black'
										>
											Size
										</Text>
									}
									leftSectionWidth={50}
									w={108}
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
							label='MD6'
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
