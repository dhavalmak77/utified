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
import crypto from 'crypto';
import jsSha512 from 'js-sha512';
import { Select, Text } from '@mantine/core';

const currentTool = 'SHA2';
const rows = 5;

const sha2Sizes = [
	{ label: '224', value: 'sha224' },
	{ label: '256', value: 'sha256' },
	{ label: '384', value: 'sha384' },
	{ label: '512', value: 'sha512' },
	{ label: '512/224', value: 'sha512/224' },
	{ label: '512/256', value: 'sha512/256' },
];

export default function SHA2() {
	const [sha2Size, setSha2Size] = useState('sha256');
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } =
		useUtToolsHistory();

	const generateHash = (data) => {
		setLoading(true);

		try {
			let resultHash;
			if (!sha2Size.startsWith('sha512')) {
				resultHash = crypto.createHash(sha2Size.split('-')[0]).update(data).digest('hex');
			} else {
				resultHash = jsSha512[sha2Size.replace('/', '_')](data);
			}

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
			title='SHA2 Hash Generator'
			description='Generate SHA2 hash.'
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
									value={sha2Size}
									placeholder='Pick a Size'
									data={sha2Sizes}
									comboboxProps={{ dropdownPadding: 5 }}
									onChange={(value) => setSha2Size(value)}
									// const [sha2Size, setSha2Size] = useState('sha256');
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
							label='SHA2'
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
