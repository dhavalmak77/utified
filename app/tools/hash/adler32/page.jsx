'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import { ActionIcon, Button, Checkbox, FileButton, Group, Text, Textarea, Tooltip } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback } from 'react';
import { LuUpload, LuX } from 'react-icons/lu';
import { TbCircleCheck, TbQrcode, TbSettingsMinus, TbSettingsPlus } from 'react-icons/tb';
import generatePhpHash from '@/app/_lib/utils/generate-php-hash';
import { useUtToolsHistory } from '@/hooks/useUtToolsHistory';
import { UndoRedoButtons } from '@/components/common/UndoRedoButtons';
import useUtHovers from '@/hooks/useUtHovers';
import CopyButton from '@/app/_components/common/CopyButton';
import DownloadButton from '@/app/_components/common/DownloadButton';

const maxQrCodeLength = 1000;
const currentTool = 'adler32';
let timeoutId;

export default function Adler32Page() {
	const { hovers, refs } = useUtHovers(['inputUploadFile', 'inputQr', 'outputQr']);
	const { inputValue, setInputValue, outputValue, setOutputValue, settings, handleSettings, autoSync, handleAutoSync, qrValues, showQRCode, handleQRCode, loading, setLoading, addToHistory, undo, redo, canUndo, canRedo, error, setError } = useUtToolsHistory();

	const generateHash = (data) => {
		clearTimeout(timeoutId);

		setLoading(true);
		timeoutId = setTimeout(async () => {
			try {
				const resultHash = await generatePhpHash(`Adler32`, data);
				console.log('result', resultHash);

				// Check if the status is 'success' before accessing data
				if (resultHash.status === 'success') {
					setOutputValue(resultHash.data); // Assuming resultHash.data is the outputValue string
					setError({ input: '' });
					addToHistory(data, resultHash.data);
				} else {
					throw new Error(resultHash.data || 'Hash generation failed.');
				}
			} catch (error) {
				setError({ input: error.message });
			} finally {
				setLoading(false);
			}
		}, 500);
	};

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setInputValue(e.target.result);

				if (autoSync.input) {
					generateHash(e.target.result);
				}
			};
			reader.readAsText(file);
		},
		[generateHash]
	);

	return (
		<PageWrapper
			title='Adler32 Hash Generator'
			description='Generate Adler32 hash.'
			aside={true}
		>
			{/* Common Card */}
			<div className='h-auto w-full bg-slate-100 border border-[#ced4da] flex rounded-md divide-x divide-[#ced4da]'>
				{/* First column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4 w-full'>
					<div className='flex w-full gap-0 items-end'>
						{/* Input */}
						<Textarea
							label='Input'
							description='Enter text to convert'
							size='md'
							rows={5}
							w={'100%'}
							className={showQRCode.input && qrValues.input.length ? 'active-qr' : ''}
							placeholder='Write text or upload a file'
							radius='md'
							value={inputValue}
							onChange={(e) => {
								if (autoSync.input) {
									generateHash(e.target.value);
								}
								setInputValue(e.target.value);
							}}
							error=''
							rightSectionWidth={24}
							rightSection={
								inputValue && (
									<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
										<Tooltip
											label='Clear inputValue'
											withArrow
										>
											<ActionIcon
												variant='subtle'
												color='gray'
												onClick={() => setInputValue('')}
												size='sm'
											>
												<LuX size={16} />
											</ActionIcon>
										</Tooltip>
									</div>
								)
							}
						/>
						{showQRCode.input && qrValues.input && (
							<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
								<QRCodeSVG
									size={126}
									value={qrValues.input.slice(0, 1000)}
									level='L'
									bordered='false'
									status={qrValues.input.length > 1000 ? 'length-error' : 'active'}
								/>
							</div>
						)}
					</div>
					{error.input.length && <Text type='danger'>{error.input}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync.input && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync.input}
								onClick={() => generateHash(inputValue)}
								loading={loading}
							>
								Generate
							</Button>
							<Checkbox
								label='Auto Generate'
								checked={autoSync.input}
								onChange={(e) => handleAutoSync('input')}
								style={{ alignSelf: 'center' }}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings('input')}
									unstyled
									c={settings.input ? 'blue' : ''}
									p={10}
								>
									{settings.input ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
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
						</Group>
					</Group>
					<Group
						spacing={0}
						gap={10}
						justify='space-between'
						hidden={!settings.input}
					>
						<Group
							spacing={0}
							gap={10}
						></Group>

						<Group
							spacing={0}
							gap={10}
						>
							<FileButton
								onChange={(e) => handleFileUpload('input', e)}
								accept='image/png,image/jpeg'
							>
								{(props) => (
									<Button
										variant={hovers.inputUploadFile ? 'filled' : 'default'}
										leftSection={<LuUpload />}
										{...refs.inputUploadFile}
										{...props}
									>
										Upload File
									</Button>
								)}
							</FileButton>

							<Tooltip
								// label={showQRCode.input ? 'QR Code is active' : 'QR Code'}
								label={showQRCode.input ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hovers.inputQr || showQRCode.input ? 'filled' : 'default'}
									onClick={() => {
										// handleShowInputQR();
										handleQRCode('input');
									}}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.input ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
									{...refs.inputQr}
								>
									QR Code
								</Button>
							</Tooltip>
						</Group>
					</Group>
				</div>

				{/* Second column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4'>
					<Group className='flex flex-col justify-center items-center'>
						<div className='flex w-full gap-0 items-end'>
							{/* Input */}
							<Textarea
								label='Adler32'
								description='Converted text will appear here'
								size='md'
								rows={5}
								w={'100%'}
								className={showQRCode.output && qrValues.output.length ? 'active-qr' : ''}
								placeholder='Converted text will appear here'
								radius='md'
								value={outputValue}
								error=''
								onChange={(e) => {
									setOutputValue(e.target.value);
								}}
								rightSectionWidth={24}
								rightSection={
									outputValue && (
										<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
											<Tooltip
												label='Clear inputValue'
												withArrow
											>
												<ActionIcon
													variant='subtle'
													color='gray'
													onClick={() => setOutputValue('')}
													size='sm'
												>
													<LuX size={16} />
												</ActionIcon>
											</Tooltip>
										</div>
									)
								}
							/>
							{showQRCode.output && qrValues.output && (
								<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
									<QRCodeSVG
										size={126}
										value={qrValues.output.slice(0, 1000)}
										level='L'
										bordered='false'
										status={qrValues.output.length > 1000 ? 'length-error' : 'active'}
									/>
								</div>
							)}
						</div>
					</Group>
					{error.output.length && <Text type='danger'>{error.output}</Text>}

					<Group justify='space-between'>
						<Group>
							<UndoRedoButtons
								onUndo={undo}
								onRedo={redo}
								canUndo={canUndo}
								canRedo={canRedo}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings('output')}
									unstyled
									c={settings.output ? 'blue' : ''}
									p={10}
								>
									{settings.output ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
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
						</Group>
					</Group>
					<Group
						spacing={0}
						gap={10}
						justify='space-between'
						hidden={!settings.output}
					>
						<Group
							spacing={0}
							gap={10}
						></Group>

						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip
								label={showQRCode.output ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hovers.outputQr || showQRCode.output ? 'filled' : 'default'}
									onClick={() => handleQRCode('output')}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.output ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
									{...refs.outputQr}
								>
									QR Code
								</Button>
							</Tooltip>
						</Group>
					</Group>
				</div>
			</div>
		</PageWrapper>
	);
}
