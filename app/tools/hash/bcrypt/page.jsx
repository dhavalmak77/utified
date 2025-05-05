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
import { generateBcryptHash } from '@/app/_lib/utils/bcrypt-hash-generate';
import { NumberInput } from '@mantine/core';

const HASH = 'Bcrypt';
const currentTool = 'bcrypt';
const rows = 5;

const maxQrCodeLength = 2953;

export default function Bcrypt() {
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } = useUtToolsHistory();

	const [saltRounds, setSaltRounds] = useState(10);

	const generateHash = async (data) => {
		setLoading(true);

		try {
			const resultHash = await generateBcryptHash(data, saltRounds);
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
			title='Bcrypt Hash Generator'
			description='Generate Bcrypt hash.'
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
								{/* <AutoSyncCheckbox
									label='Auto Generate'
									checked={autoSync.input}
									onChange={(e) => toggleAutoSync('input', e.target.checked)}
								/> */}
								<NumberInput
									value={saltRounds}
									min={1}
									max={31}
									step={1}
									onChange={setSaltRounds}
									hideControls
									leftSection={<div className='pr-2'>Salt Rounds</div>}
									leftSectionWidth={100}
									leftSectionProps={{ className: '-mr-2 ml-1 select-none text-black' }}
									w={129}
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
							label='Bcrypt'
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
