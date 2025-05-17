'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { useUtHovers, useUtToolsHistory } from '@/app/_hooks';
import { ColumnInputsWrapper, ColumnSettingsWrapper, CommonGroup, CopyButton, DownloadButton, QRCode, QRCodeButton, ToolBoxColumnWrapper, ToolBoxWrapper, UploadFileButton, UtTextarea } from '@/app/_components/common';
import { Button, FileButton, Text, Tooltip } from '@mantine/core';
import { LuClipboardCopy } from 'react-icons/lu';
import cn from '@/app/_lib/utils/cn';
import { textTranformations, convertTextCase } from './convert-utils';

const currentTool = 'SHA1';
const rows = 6;

const caseButtons = Object.entries(textTranformations).map(([key, el]) => ({ label: el.label, value: key }));

export default function TextCaseConverter() {
	const [caseType, setCaseType] = useState('');
	const { hovers, refs } = useUtHovers(['takeOutputAsInput']);
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, toggleSettings, autoSync, toggleAutoSync, qrValues, showQRCode, toggleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, addError, clearError } =
		useUtToolsHistory();

	const handleConvert = (caseType, inputText) => {
		if (!caseType) return;

		console.log(caseType, inputText);

		setCaseType(caseType);
		const resultText = convertTextCase(caseType, inputText);
		setOutputValue(resultText);
	};

	const handleSetResultInInput = () => {
		setInputValue(outputValue);
	};

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setInputValue(e.target.result);
			};
			reader.readAsText(file);
		},
		[handleConvert]
	);

	useEffect(() => {
		handleConvert(caseType, inputValue);
	}, [inputValue]);

	return (
		<PageWrapper
			title='Text Case Converter'
			description='Convert text into various cases with ease.'
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
								<UploadFileButton
									onChange={(e) => handleFileUpload('input', e)}
									accept={'.txt'}
								/>
							</CommonGroup>
							<CommonGroup>
								<CopyButton
									textToCopy={inputValue}
									disabled={!inputValue}
								/>
								<QRCodeButton
									display={showQRCode.input}
									onClick={() => toggleQRCode('input')}
									disabled={!inputValue && !showQRCode.input}
									iconOnly
								/>
								<Tooltip
									label='Take the output text as input'
									withArrow
									arrowSize={8}
								>
									<Button
										variant={hovers.takeOutputAsInput ? 'filled' : 'default'}
										onClick={handleSetResultInInput}
										px={10}
										className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !outputValue })}
										disabled={!outputValue}
										{...refs.takeOutputAsInput}
									>
										<LuClipboardCopy size={16} />
									</Button>
								</Tooltip>
							</CommonGroup>
						</CommonGroup>
					</ColumnSettingsWrapper>
				</ToolBoxColumnWrapper>

				{/* Second column */}
				<ToolBoxColumnWrapper error={error.output}>
					<ColumnInputsWrapper error={error.output}>
						<UtTextarea
							label={
								<Text fw={500}>
									Output
									{caseType && (
										<Text
											span
											size='xs'
											c='dimmed'
										>
											&nbsp;({textTranformations[caseType].label})
										</Text>
									)}
								</Text>
							}
							description='Converted text will appear here'
							rows={rows}
							className={showQRCode.output && qrValues.output.length ? 'active-qr' : ''}
							placeholder='Converted text will appear here'
							value={outputValue}
							setValue={setOutputValue}
							onChange={(e) => {
								if (autoSync.output) {
									handleConvert(e.target.value);
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
						<CommonGroup></CommonGroup>
						<CommonGroup>
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
							<QRCodeButton
								display={showQRCode.output}
								onClick={() => toggleQRCode('output')}
								disabled={!outputValue && !showQRCode.output}
								iconOnly
							/>
						</CommonGroup>
					</CommonGroup>
				</ToolBoxColumnWrapper>
			</ToolBoxWrapper>

			<div className='flex flex-wrap gap-3 mt-4'>
				{caseButtons.map((el) => (
					<Button
						key={el.value}
						variant={caseType === el.value ? 'filled' : 'default'}
						className={cn('rounded-md px-4 py-2')}
						onClick={() => handleConvert(el.value, inputValue)}
					>
						{el.label}
					</Button>
				))}
			</div>
		</PageWrapper>
	);
}
