'use client';

import './style.css';
import { PageWrapper } from "@/app/_components/layout/page-wrapper";
import cn from "@/app/_lib/utils/cn";
import { ActionIcon, Box, Button, Checkbox, FileButton, Group, NumberInput, Select, Text, Textarea, Tooltip, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import { LuCopy, LuCopyCheck, LuDownload, LuEraser, LuUpload, LuX } from "react-icons/lu";
import { TbCircleCheck, TbCopy, TbCopyCheck, TbDownload, TbQrcode, TbQrcodeOff, TbSettings, TbSettingsMinus, TbSettingsFilled, TbSettingsPlus } from "react-icons/tb";
import { AiOutlineRedo, AiOutlineUndo } from 'react-icons/ai';

const initialCopyStatus = { type: '', isSuccess: false, hasError: false, toggle: false };
const initialErrorState = { type: '', message: '' };
const defaultOption = {
	label: 'UTF-8 (Deafult)',
	value: '',
};

const __ENCODE = 'ENCODE';
const __DECODE = 'DECODE';
const STRICT = 'Strict';

const maxQrCodeLength = 2953;

export default function Base64() {
	const theme = useMantineTheme();

	const [encodeInput, setEncodeInput] = useState('');
	const [decodeInput, setDecodeInput] = useState('');
	const [useTabs, setUseTabs] = useState('');
	const [tabSpace, setTabSpace] = useState(2);
	const [autoSync, setAutoSync] = useState({ [__ENCODE]: false, [__DECODE]: false });
	const [error, setError] = useState(initialErrorState);
	const [history, setHistory] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [qrValues, setQrValues] = useState({ [__ENCODE]: '', [__DECODE]: '' });
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [settings, setSettings] = useState([__ENCODE]);
	const [showQRCode, setShowQRCode] = useState([]);

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
		if (showQRCode.includes(__ENCODE) || showQRCode.includes(__DECODE)) {
			const qrCodeId = setTimeout(() => {
				setQrValues({
					[__ENCODE]: encodeInput,
					[__DECODE]: decodeInput,
				});
			}, 750);

			return () => clearTimeout(qrCodeId);
		}
	}, [encodeInput, decodeInput, showQRCode]);

	const addToHistory = useCallback(
		(newState) => {
			const updatedHistory = history.slice(0, currentIndex + 1);
			updatedHistory.push(newState);
			setHistory(updatedHistory);
			setCurrentIndex(updatedHistory.length - 1);
		},
		[history, currentIndex]
	);

	const handleQRCode = useCallback(
		(type) => {
			if (type === 'sync') {
				setShowQRCode((prev) => settings.filter((el) => prev.includes(el)));
			} else {
				setShowQRCode((prev) => (!settings.includes(type) || prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]));
			}
		},
		[settings]
	);

	useEffect(() => {
		handleQRCode('sync');
	}, [settings]);

	const handleSettings = useCallback((type) => {
		setSettings((prev) => (prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]));
	}, []);

	const handleUndo = () => {
		if (currentIndex > 0) {
			const prevState = history[currentIndex - 1];
			setEncodeInput(prevState.jsonInput);
			setDecodeInput(prevState.objectOutput);
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleRedo = () => {
		if (currentIndex < history.length - 1) {
			const nextState = history[currentIndex + 1];
			setEncodeInput(nextState.jsonInput);
			setDecodeInput(nextState.objectOutput);
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handleConversion = (conversionType, mode, inputText) => {
		setError(initialErrorState);

		console.log('inputText 1st', conversionType, mode, inputText);
		if (conversionType === __ENCODE) {
			let encodedData;
			if (mode === STRICT) {
				encodedData = encodeURIComponent(inputText);
			} else {
				encodedData = encodeURI(inputText);
			}

			console.log('inputText', inputText, encodedData);
			setEncodeInput(inputText);
			setDecodeInput(encodedData);
			addToHistory({ encodeInput: inputText, objectOutput: encodedData });
		} else {
			let decodedData;
			if (mode === STRICT) {
				decodedData = decodeURIComponent(inputText);
			} else {
				decodedData = decodeURI(inputText);
			}

			setDecodeInput(inputText);
			setEncodeInput(decodedData);
			addToHistory({ encodeInput: decodedData, objectOutput: inputText });
		}

	};

	const handleClear = useCallback(() => {
		setError(initialErrorState);
		setEncodeInput('');
		setDecodeInput('');
	}, []);

	const handleCopy = useCallback(
		async (conversionType) => {
			try {
				const textToCopy = conversionType === __ENCODE ? encodeInput : decodeInput;
				await navigator.clipboard.writeText(textToCopy);
				setCopyStatus({ type: conversionType, isSuccess: true, hasError: false, toggle: !copyStatus.toggle });
			} catch (err) {
				console.error('Failed to copy text: ', err);
				setCopyStatus({ type: conversionType, isSuccess: false, hasError: true, toggle: !copyStatus.toggle });
			}
		},
		[copyStatus.toggle, encodeInput, decodeInput]
	);

	const handleDownload = useCallback(
		(typeIdentity) => {
			const result = typeIdentity === ENCODE ? encodeInput : decodeInput;
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
		[encodeInput, decodeInput]
	);

	const handleFileUpload = useCallback(
		(type, file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (type === __ENCODE) {
					setEncodeInput(e.target.result);
				} else {
					setDecodeInput(e.target.result);
				}

				// handleConversion(type, '', e.target.result);
			};
			reader.readAsText(file);
		},
		[handleConversion]
	);

	useEffect(() => {
		if (autoSync[__ENCODE]) {
			handleConversion(__ENCODE, '', encodeInput);
		} else if (autoSync[__DECODE]) {
			handleConversion(__DECODE, '', decodeInput);	
		}
	}, [encodeInput, useTabs, tabSpace, autoSync]);

	useEffect(() => {
		if (!autoSync) {
			handleConversion();
		}
	}, [useTabs, tabSpace]);

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

	return (
		<PageWrapper
			title='URL Encoder/Decoder'
			description='Encode or decode any URLs easily.'
			aside={true}
		>
			{/* Common Card */}
			<div className='h-auto w-full bg-slate-100 border border-[#ced4da] flex rounded-md divide-x divide-[#ced4da]'>
				{/* First column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4 w-full'>
					<div className='flex w-full gap-0 items-end'>
						{/* Input */}
						<Textarea
							label='URL Encode'
							description='Enter text to encode'
							size='md'
							rows={10}
							w={'100%'}
							className={showQRCode.includes(__ENCODE) && qrValues[__ENCODE].length ? 'active-qr' : ''}
							placeholder='Enter text to encode'
							radius='md'
							value={encodeInput}
							error=''
							onChange={(e) => {
								if (autoSync[__ENCODE]) {
									handleConversion(__ENCODE, e.target.value);
								}
								setEncodeInput(e.target.value);
							}}
							rightSectionWidth={24}
							rightSection={
								encodeInput && (
									<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
										<Tooltip
											label='Clear input'
											withArrow
										>
											<ActionIcon
												variant='subtle'
												color='gray'
												onClick={() => setEncodeInput('')}
												size='sm'
											>
												<LuX size={16} />
											</ActionIcon>
										</Tooltip>
									</div>
								)
							}
						/>
						{showQRCode.includes(__ENCODE) && qrValues[__ENCODE] && (
							<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
								<QRCodeSVG
									size={250}
									value={qrValues[__ENCODE].slice(0, 1000)}
									level='L'
									bordered='false'
									status={qrValues[__ENCODE].length > 1000 ? 'length-error' : 'active'}
									statusRender={(info) => qrCustomStatus(info, __ENCODE)}
								/>
							</div>
						)}
					</div>
					{error.type === __ENCODE && <Text type='danger'>{error.message}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[__ENCODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[__ENCODE]}
								onClick={() => handleConversion(__ENCODE, '', encodeInput)}
							>
								Encode
							</Button>
							<Button
								variant='filled'
								// className={cn(!autoSync[__ENCODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[__ENCODE]}
								onClick={() => handleConversion(__ENCODE, STRICT, encodeInput)}
							>
								Strict Encode
							</Button>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(__ENCODE)}
									unstyled
									c={settings.includes(__ENCODE) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(__ENCODE) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== __ENCODE ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy1 ? 'filled' : 'default'}
									onClick={() => handleCopy(__ENCODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !encodeInput })}
									disabled={!encodeInput}
									px={10}
									ref={refCopy1}
								>
									{copyStatus.type !== __ENCODE ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload1 ? 'filled' : 'default'}
									onClick={() => handleDownload(__ENCODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !encodeInput })}
									disabled={!encodeInput}
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
						hidden={!settings.includes(__ENCODE)}
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
								onChange={(e) => handleFileUpload(__ENCODE, e)}
								accept='text'
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
								label={showQRCode.includes(__ENCODE) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr1 || showQRCode.includes(__ENCODE) ? 'filled' : 'default'}
									// variant={showQRCode.includes(__ENCODE) ? 'filled' : 'default'}
									onClick={() => handleQRCode(__ENCODE)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(__ENCODE) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
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
								label='URL Decode'
								description='Enter Text to decode'
								size='md'
								rows={10}
								w={'100%'}
								className={showQRCode.includes(__DECODE) && qrValues[__DECODE].length ? 'active-qr' : ''}
								placeholder='Encoded URL will appear here'
								radius='md'
								value={decodeInput}
								error=''
								onChange={(e) => {
									if (autoSync[__DECODE]) {
										handleConversion(__DECODE, e.target.value);
									}
									setDecodeInput(e.target.value);
								}}
								style={{ tabSize: useTabs ? tabSpace : undefined }}
								rightSectionWidth={24}
								rightSection={
									decodeInput && (
										<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
											<Tooltip
												label='Clear input'
												withArrow
											>
												<ActionIcon
													variant='subtle'
													color='gray'
													onClick={() => setDecodeInput('')}
													size='sm'
												>
													<LuX size={16} />
												</ActionIcon>
											</Tooltip>
										</div>
									)
								}
							/>
							{showQRCode.includes(__DECODE) && qrValues[__DECODE] && (
								<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
									<QRCodeSVG
										size={250}
										value={qrValues[__DECODE].slice(0, 1000)}
										level='L'
										bordered='false'
										status={qrValues[__DECODE].length > 1000 ? 'length-error' : 'active'}
										statusRender={(info) => qrCustomStatus(info, __DECODE)}
									/>
								</div>
							)}
						</div>
						{error.type === __DECODE && <Text type='danger'>{error.message}</Text>}
					</Group>

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[__DECODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[__DECODE]}
								onClick={() => handleConversion(__DECODE, '', decodeInput)}
							>
								Decode
							</Button>
							<Button
								variant='filled'
								// className={cn(!autoSync[__DECODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[__DECODE]}
								onClick={() => handleConversion(__DECODE, STRICT, decodeInput)}
							>
								Strict Decode
							</Button>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(__DECODE)}
									unstyled
									c={settings.includes(__DECODE) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(__DECODE) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== __DECODE ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy2 ? 'filled' : 'default'}
									onClick={() => handleCopy(__DECODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !decodeInput })}
									disabled={!decodeInput}
									px={10}
									ref={refCopy2}
								>
									{copyStatus.type !== __DECODE ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload2 ? 'filled' : 'default'}
									onClick={() => handleDownload(__DECODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !decodeInput })}
									disabled={!decodeInput}
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
						hidden={!settings.includes(__DECODE)}
					>
						<Group
							spacing={0}
							gap={10}
						>
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
							<Tooltip
								label={showQRCode.includes(__DECODE) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<FileButton
									onChange={(e) => handleFileUpload(__DECODE, e)}
									accept='text'
								>
									{(props) => (
										<Button
											variant={hoveredUploadFile2 ? 'filled' : 'default'}
											leftSection={<LuUpload />}
											ref={refUploadFile2}
											{...props}
										>
											Upload File
										</Button>
									)}
								</FileButton>
							</Tooltip>
							<Button
								variant={hoveredQr2 || showQRCode.includes(__DECODE) ? 'filled' : 'default'}
								// variant={showQRCode.includes(__DECODE) ? 'filled' : 'default'}
								onClick={() => handleQRCode(__DECODE)}
								className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
								leftSection={showQRCode.includes(__DECODE) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
								ref={refQr2}
							>
								QR Code
							</Button>
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
						onClick={() => handleConversion(el.value, text)}
					>
						{el.label}
					</Button>
				))}
			</div> */}
		</PageWrapper>
	);
}
