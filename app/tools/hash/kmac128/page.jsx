'use client';

import crypto from 'crypto';
import './style.css';
import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import cn from '@/app/_lib/utils/cn';
import { ActionIcon, Box, Button, Checkbox, FileButton, Group, Select, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useEffect, useState } from 'react';
import { LuCopy, LuCopyCheck, LuDownload, LuEraser, LuUpload, LuX } from 'react-icons/lu';
import { TbCircleCheck, TbCopy, TbCopyCheck, TbDownload, TbQrcode, TbQrcodeOff, TbSettings, TbSettingsMinus, TbSettingsFilled, TbSettingsPlus } from 'react-icons/tb';
import md2 from 'crypto-api/src/hasher/md2';
import { AiOutlineUndo, AiOutlineRedo } from 'react-icons/ai';
import { toHex } from 'crypto-api/src/encoder/hex';
import jsSha3 from 'js-sha3';

const initialCopyStatus = { type: '', isSuccess: false, hasError: false, toggle: false };
const initialErrorState = { type: '', message: '' };

const INPUT = 'Input';
const HASH = 'KMAC128';

const maxQrCodeLength = 2953;

export default function KMac128() {
	const [input, setInput] = useState('');
	const [hash, setHash] = useState('');
	const [qrValues, setQrValues] = useState({ [INPUT]: '', [HASH]: '' });
	const [error, setError] = useState(initialErrorState);
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [settings, setSettings] = useState([INPUT]);
	const [showQRCode, setShowQRCode] = useState([]);
	const [autoSync, setAutoSync] = useState({ [INPUT]: false, [HASH]: false });
	const [history, setHistory] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);

	const { hovered: hoveredTakeOutputAsInput, ref: refTakeOutputAsInput } = useHover();
	const { hovered: hoveredUploadFile1, ref: refUploadFile1 } = useHover();
	const { hovered: hoveredUploadFile2, ref: refUploadFile2 } = useHover();
	const { hovered: hoveredCopy1, ref: refCopy1 } = useHover();
	const { hovered: hoveredCopy2, ref: refCopy2 } = useHover();
	const { hovered: hoveredQr1, ref: refQr1 } = useHover();
	const { hovered: hoveredQr2, ref: refQr2 } = useHover();
	const { hovered: hoveredDownload1, ref: refDownload1 } = useHover();
	const { hovered: hoveredDownload2, ref: refDownload2 } = useHover();
	const { hovered: hoveredClearBoth, ref: refClearBoth } = useHover();
	const { hovered: hoveredUndo2, ref: refUndo2 } = useHover();
	const { hovered: hoveredRedo2, ref: refRedo2 } = useHover();

	useEffect(() => {
		if (copyStatus.hasError || copyStatus.isSuccess) {
			const timeoutId = setTimeout(() => {
				setCopyStatus(initialCopyStatus);
			}, 5000);

			return () => clearTimeout(timeoutId);
		}
	}, [copyStatus]);

	useEffect(() => {
		if (showQRCode.includes(INPUT) || showQRCode.includes(HASH)) {
			const qrCodeId = setTimeout(() => {
				setQrValues({
					[INPUT]: input,
					[HASH]: hash,
				});
			}, 750);

			return () => clearTimeout(qrCodeId);
		}
	}, [input, hash, showQRCode]);

	const handleQRCode = (type) => {
		setShowQRCode((prev) => (prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]));
	};

	const handleSettings = useCallback((type) => {
		setSettings((prev) => (prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]));
	}, []);

	const addToHistory = (newState) => {
		const updatedHistory = history.slice(0, currentIndex + 1);
		updatedHistory.push(newState);
		setHistory(updatedHistory);
		setCurrentIndex(updatedHistory.length - 1);
	};

	const handleUndo = () => {
		if (currentIndex > 0) {
			const prevState = history[currentIndex - 1];
			setInput(prevState.input);
			setHash(prevState.hash);
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleRedo = () => {
		if (currentIndex < history.length - 1) {
			const nextState = history[currentIndex + 1];
			setInput(nextState.input);
			setHash(nextState.hash);
			setCurrentIndex(currentIndex + 1);
		}
	};

	const generateHash = (data) => {
		try {
			const resultHash = jsSha3.kmac128(data, '', 256, '');
			setHash(resultHash);
			setError('');

			addToHistory({ input: data, hash: resultHash });
		} catch (error) {
			setError({ type: INPUT, message: error.message });
		}
	};

	const handleClear = useCallback(() => {
		setError(initialErrorState);
		setInput('');
		setHash('');
	}, []);

	const handleCopy = useCallback(
		async (conversionType) => {
			try {
				const textToCopy = conversionType === INPUT ? input : hash;
				await navigator.clipboard.writeText(textToCopy);
				setCopyStatus({ type: conversionType, isSuccess: true, hasError: false, toggle: !copyStatus.toggle });
			} catch (err) {
				console.error('Failed to copy text: ', err);
				setCopyStatus({ type: conversionType, isSuccess: false, hasError: true, toggle: !copyStatus.toggle });
			}
		},
		[copyStatus.toggle, input, hash]
	);

	const handleDownload = useCallback(
		(typeIdentity) => {
			const result = typeIdentity === INPUT ? input : hash;
			const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${typeIdentity.toLowerCase()}.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		},
		[input, hash]
	);

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

	const qrCustomStatus = (info, type) => {
		if (info.status.includes('length-error')) {
			return (
				<div className='text-red-600'>
					<p>
						<ExclamationCircleOutlined /> Input too long (limit 1000 chars).
					</p>
					<p>
						<Button
							type='link'
							onClick={() => handleQRCode(type)}
						>
							Dismiss QR <QrcodeOutlined />
						</Button>
					</p>
				</div>
			);
		}

		return null;
	};

	let inputLabel = (
		<p className='w-full flex justify-between'>
			<span>Text</span>
		</p>
	);
	let outputLabel = (
		<p className='w-full flex justify-between'>
			<span>{`${HASH} hash`}</span>
		</p>
	);

	return (
		<PageWrapper
			title='Kmac128 Hash Generator'
			description='Generate Kmac128 hash.'
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
							className={showQRCode.includes(INPUT) && qrValues[INPUT].length ? 'active-qr' : ''}
							placeholder='Write text or upload a file'
							radius='md'
							value={input}
							onChange={(e) => {
								if (autoSync[INPUT]) {
									generateHash(e.target.value);
								}
								setInput(e.target.value);
							}}
							error=''
							rightSectionWidth={24}
							rightSection={
								input && (
									<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
										<Tooltip
											label='Clear input'
											withArrow
										>
											<ActionIcon
												variant='subtle'
												color='gray'
												onClick={() => setInput('')}
												size='sm'
											>
												<LuX size={16} />
											</ActionIcon>
										</Tooltip>
									</div>
								)
							}
						/>
						{showQRCode.includes(INPUT) && qrValues[INPUT] && (
							<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
								<QRCodeSVG
									size={126}
									value={qrValues[INPUT].slice(0, 1000)}
									level='L'
									bordered={false}
									status={qrValues[INPUT].length > 1000 ? 'length-error' : 'active'}
									statusRender={(info) => qrCustomStatus(info, INPUT)}
								/>
							</div>
						)}
					</div>
					{error.type === INPUT && <Text type='danger'>{error.message}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[INPUT] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[INPUT]}
								onClick={() => generateHash(input)}
							>
								Generate
							</Button>
							<Checkbox
								label='Auto Generate'
								checked={autoSync[INPUT]}
								onChange={(e) => setAutoSync((prev) => ({ ...prev, [INPUT]: !prev[INPUT] }))}
								style={{ alignSelf: 'center' }}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(INPUT)}
									unstyled
									c={settings.includes(INPUT) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(INPUT) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== INPUT ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy1 ? 'filled' : 'default'}
									onClick={() => handleCopy(INPUT)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !input })}
									disabled={!input}
									px={10}
									ref={refCopy1}
								>
									{copyStatus.type !== INPUT ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload1 ? 'filled' : 'default'}
									onClick={() => handleDownload(INPUT)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !input })}
									disabled={!input}
									px={10}
									ref={refDownload1}
								>
									<TbDownload size={16} />
								</Button>
							</Tooltip>
						</Group>
					</Group>
					<Group
						spacing={0}
						gap={10}
						justify='space-between'
						hidden={!settings.includes(INPUT)}
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
								onChange={(e) => handleFileUpload(INPUT, e)}
								accept='image/png,image/jpeg'
							>
								{(props) => (
									<Button
										variant={hoveredUploadFile1 ? 'filled' : 'default'}
										leftSection={<LuUpload />}
										ref={refUploadFile1}
										{...props}
									>
										Upload File
									</Button>
								)}
							</FileButton>

							<Tooltip
								label={showQRCode.includes(INPUT) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr1 || showQRCode.includes(INPUT) ? 'filled' : 'default'}
									onClick={() => handleQRCode(INPUT)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(INPUT) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
									ref={refQr1}
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
								label='Kmac128'
								description='Converted text will appear here'
								size='md'
								rows={5}
								w={'100%'}
								className={showQRCode.includes(HASH) && qrValues[HASH].length ? 'active-qr' : ''}
								placeholder='Converted text will appear here'
								radius='md'
								value={hash}
								error=''
								onChange={(e) => {
									setHash(e.target.value);
								}}
								rightSectionWidth={24}
								rightSection={
									hash && (
										<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
											<Tooltip
												label='Clear input'
												withArrow
											>
												<ActionIcon
													variant='subtle'
													color='gray'
													onClick={() => setHash('')}
													size='sm'
												>
													<LuX size={16} />
												</ActionIcon>
											</Tooltip>
										</div>
									)
								}
							/>
							{showQRCode.includes(HASH) && qrValues[HASH] && (
								<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
									<QRCodeSVG
										size={126}
										value={qrValues[HASH].slice(0, 1000)}
										level='L'
										bordered={false}
										status={qrValues[HASH].length > 1000 ? 'length-error' : 'active'}
										statusRender={(info) => qrCustomStatus(info, HASH)}
									/>
								</div>
							)}
						</div>
					</Group>
					{error.type === HASH && <Text type='danger'>{error.message}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant={hoveredUndo2 ? 'filled' : 'default'}
								// className={cn(!autoSync[HASH] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								onClick={handleUndo}
								leftSection={<AiOutlineUndo size={16} />}
								disabled={currentIndex <= 0}
								ref={refUndo2}
							>
								Undo
							</Button>
							<Button
								variant={hoveredRedo2 ? 'filled' : 'default'}
								// className={cn(!autoSync[HASH] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								leftSection={<AiOutlineRedo size={16} />}
								onClick={handleRedo}
								disabled={currentIndex >= history.length - 1}
								ref={refRedo2}
							>
								Redo
							</Button>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(HASH)}
									unstyled
									c={settings.includes(HASH) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(HASH) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== HASH ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy2 ? 'filled' : 'default'}
									onClick={() => handleCopy(HASH)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !hash })}
									disabled={!hash}
									px={10}
									ref={refCopy2}
								>
									{copyStatus.type !== HASH ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload2 ? 'filled' : 'default'}
									onClick={() => handleDownload(HASH)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !hash })}
									disabled={!hash}
									px={10}
									ref={refDownload2}
								>
									<TbDownload size={16} />
								</Button>
							</Tooltip>
						</Group>
					</Group>
					<Group
						spacing={0}
						gap={10}
						justify='space-between'
						hidden={!settings.includes(HASH)}
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
								label={showQRCode.includes(HASH) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr2 || showQRCode.includes(HASH) ? 'filled' : 'default'}
									onClick={() => handleQRCode(HASH)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(HASH) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
									ref={refQr2}
								>
									QR Code
								</Button>
							</Tooltip>
						</Group>
					</Group>
				</div>
			</div>

			{/* <div className='flex flex-wrap gap-3 mt-4'>
				{caseButtons.map((el) => (
					<Button
						key={el.value}
						variant={caseType === el.value ? 'filled' : 'default'}
						className={cn('rounded-md px-4 py-2')}
						onClick={() => handleConvert(el.value, text)}
					>
						{el.label}
					</Button>
				))}
			</div> */}
		</PageWrapper>
	);
}
