'use client';

import './style.css';
import { PageWrapper } from "@/app/_components/layout/page-wrapper";
import cn from "@/app/_lib/utils/cn";
import { ActionIcon, Box, Button, Checkbox, FileButton, Group, Select, Text, Textarea, Tooltip, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import { LuCopy, LuCopyCheck, LuDownload, LuEraser, LuUpload, LuX } from "react-icons/lu";
import { TbCircleCheck, TbCopy, TbCopyCheck, TbDownload, TbQrcode, TbQrcodeOff, TbSettings, TbSettingsMinus, TbSettingsFilled, TbSettingsPlus } from "react-icons/tb";
import { CHARSET_OPTIONS } from "./charsets";
import { base64Conversions } from './charset-conversions';

const initialCopyStatus = { type: '', isSuccess: false, hasError: false, toggle: false };
const initialErrorState = { type: '', message: '' };
const defaultOption = {
	label: 'UTF-8 (Deafult)',
	value: '',
};

const ENCODE = 'ENCODE';
const DECODE = 'DECODE';

const maxQrCodeLength = 2953;

export default function Base64() {
	const theme = useMantineTheme();

	const [encodeInput, setEncodeInput] = useState('');
	const [decodeInput, setDecodeInput] = useState('');
	const [qrValues, setQrValues] = useState({ [ENCODE]: '', [DECODE]: '' });
	const [error, setError] = useState(initialErrorState);
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [settings, setSettings] = useState([ENCODE]);
	const [selectedCharset, setSelectedCharset] = useState({ conversionType: '', charset: '', title: '', [ENCODE]: '', [DECODE]: '' });
	const [showQRCode, setShowQRCode] = useState([]);
	const [autoSync, setAutoSync] = useState({ [ENCODE]: false, [DECODE]: false });

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

	useEffect(() => {
		if (copyStatus.hasError || copyStatus.isSuccess) {
			const timeoutId = setTimeout(() => {
				setCopyStatus(initialCopyStatus);
			}, 5000);

			return () => clearTimeout(timeoutId);
		}
	}, [copyStatus]);

	useEffect(() => {
		if (showQRCode.includes(ENCODE) || showQRCode.includes(DECODE)) {
			const qrCodeId = setTimeout(() => {
				setQrValues({
					[ENCODE]: encodeInput,
					[DECODE]: decodeInput,
				});
			}, 750);

			return () => clearTimeout(qrCodeId);
		}
	}, [encodeInput, decodeInput, showQRCode]);

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

	const handleConversion = useCallback(
		(conversionType, inputText) => {
			setError(initialErrorState);

			if (conversionType === ENCODE) {
				setEncodeInput(inputText);

				if (selectedCharset.conversionType === ENCODE && selectedCharset.charset) {
					const encoded = base64Conversions(ENCODE, inputText, selectedCharset.charset);
					if (encoded.status) {
						console.log("ENCODED", encoded);
						setDecodeInput(encoded.data);
					} else {
						setError({ type: ENCODE, message: encoded.data });
						setDecodeInput('');
					}
				} else {
					try {
						const encodedText = btoa(inputText);
						setDecodeInput(encodedText);
					} catch (error) {
						const errorMessage = error.message.split(':').pop().trim();
						setError({ type: ENCODE, message: errorMessage });
						setDecodeInput('');
					}
				}
			} else {
				setDecodeInput(inputText);

				if (selectedCharset.conversionType === DECODE && selectedCharset.charset) {
					const decoded = base64Conversions(DECODE, inputText, selectedCharset.charset);
					if (decoded.status) {
						setEncodeInput(decoded.data);
					} else {
						setError({ type: DECODE, message: decoded.data });
						setEncodeInput('');
					}
				} else {
					try {
						const decodedText = atob(inputText);
						setEncodeInput(decodedText);
					} catch (error) {
						const errorMessage = error.message.split(':').pop().trim();
						setError({ type: DECODE, message: errorMessage });
						setEncodeInput('');
					}
				}
			}
		},
		[selectedCharset]
	);

	const handleClear = useCallback(() => {
		setError(initialErrorState);
		setEncodeInput('');
		setDecodeInput('');
	}, []);

	const handleCopy = useCallback(
		async (conversionType) => {
			try {
				const textToCopy = conversionType === ENCODE ? encodeInput : decodeInput;
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
			const decodeInput = typeIdentity === ENCODE ? encodeInput : decodeInput;
			const blob = new Blob([decodeInput], { type: 'text/plain;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `base64-${typeIdentity.toLowerCase()}.txt`;
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
				if (type === ENCODE) {
					setEncodeInput(e.target.decodeInput);
				} else {
					setDecodeInput(e.target.decodeInput);
				}

				handleConversion(type, e.target.decodeInput);
			};
			reader.readAsText(file);
		},
		[handleConversion]
	);

	const handleCharsetChange = (type, value, option) => {
		setSelectedCharset({
			conversionType: type,
			charset: value,
			// title: option.label,
			[ENCODE]: type === ENCODE ? value : '',
			[DECODE]: type === DECODE ? value : '',
		});
	};

	let encodeItemLabel = 'Base64 Encode',
		decodeItemLabel = 'Base64 Decode';
	if (selectedCharset.conversionType === ENCODE && selectedCharset[ENCODE]) {
		encodeItemLabel = (
			<Text>
				{encodeItemLabel}{' '}
				<Text
					type='secondary'
					style={{ fontSize: 11.5 }}
				>
					({selectedCharset.title})
				</Text>
			</Text>
		); //(${selectedCharset.title})`;
	} else if (selectedCharset.conversionType === DECODE && selectedCharset[DECODE]) {
		decodeItemLabel = (
			<Text>
				{decodeItemLabel}{' '}
				<Text
					type='secondary'
					style={{ fontSize: 11.5 }}
				>
					({selectedCharset.title})
				</Text>
			</Text>
		); //(${selectedCharset.title})`;
	}

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
			title='Base64 Encoder/Decoder'
			description='Encode or decode your text easily with base64.'
			aside={true}
		>
			{/* Common Card */}
			<div className='h-auto w-full bg-slate-100 border border-[#ced4da] flex rounded-md divide-x divide-[#ced4da]'>
				{/* First column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4 w-full'>
					<div className='flex w-full gap-0 items-end'>
						{/* Input */}
						<Textarea
							label='Base64 Encode'
							description='Enter text to encode'
							size='md'
							rows={5}
							w={'100%'}
							className={showQRCode.includes(ENCODE) && qrValues[ENCODE].length ? 'active-qr' : ''}
							placeholder='Write text or upload a file'
							radius='md'
							value={encodeInput}
							error=''
							onChange={(e) => {
								if (autoSync[ENCODE]) {
									handleConversion(ENCODE, e.target.value);
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
						{showQRCode.includes(ENCODE) && qrValues[ENCODE] && (
							<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
								<QRCodeSVG
									size={126}
									value={qrValues[ENCODE].slice(0, 1000)}
									level='L'
									bordered='false'
									status={qrValues[ENCODE].length > 1000 ? 'length-error' : 'active'}
									statusRender={(info) => qrCustomStatus(info, ENCODE)}
								/>
							</div>
						)}
					</div>
					{error.type === ENCODE && <Text type='danger'>{error.message}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[ENCODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[ENCODE]}
								onClick={() => handleConversion(ENCODE, encodeInput)}
							>
								Encode
							</Button>
							<Checkbox
								label='Auto Encode'
								checked={autoSync[ENCODE]}
								onChange={(e) => setAutoSync((prev) => ({ ...prev, [ENCODE]: !prev[ENCODE] }))}
								style={{ alignSelf: 'center' }}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(ENCODE)}
									unstyled
									c={settings.includes(ENCODE) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(ENCODE) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== ENCODE ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy1 ? 'filled' : 'default'}
									onClick={() => handleCopy(ENCODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !encodeInput })}
									disabled={!encodeInput}
									px={10}
									ref={refCopy1}
								>
									{copyStatus.type !== ENCODE ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload1 ? 'filled' : 'default'}
									onClick={() => handleDownload(ENCODE)}
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
						hidden={!settings.includes(ENCODE)}
					>
						<Group
							spacing={0}
							gap={10}
						>
							<Select
								placeholder='Pick a charset'
								data={[defaultOption, ...CHARSET_OPTIONS]}
								comboboxProps={{ dropdownPadding: 5 }}
								onChange={(value) => handleCharsetChange(ENCODE, value)}
								allowDeselect={false}
								searchable
							/>
						</Group>

						<Group
							spacing={0}
							gap={10}
						>
							<FileButton
								onChange={(e) => handleFileUpload(ENCODE, e)}
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
								label={showQRCode.includes(ENCODE) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr1 || showQRCode.includes(ENCODE) ? 'filled' : 'default'}
									// variant={showQRCode.includes(ENCODE) ? 'filled' : 'default'}
									onClick={() => handleQRCode(ENCODE)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(ENCODE) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
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
								label='Base64 Decode'
								description='Converted text will appear here'
								size='md'
								rows={5}
								w={'100%'}
								className={showQRCode.includes(DECODE) && qrValues[DECODE].length ? 'active-qr' : ''}
								placeholder='Converted text will appear here'
								radius='md'
								value={decodeInput}
								error=''
								onChange={(e) => {
									if (autoSync[DECODE]) {
										handleConversion(DECODE, e.target.value);
									}
									setDecodeInput(e.target.value);
								}}
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
							{showQRCode.includes(DECODE) && qrValues[DECODE] && (
								<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
									<QRCodeSVG
										size={126}
										value={qrValues[DECODE].slice(0, 1000)}
										level='L'
										bordered='false'
										status={qrValues[DECODE].length > 1000 ? 'length-error' : 'active'}
										statusRender={(info) => qrCustomStatus(info, DECODE)}
									/>
								</div>
							)}
						</div>
					</Group>
					{error.type === DECODE && <Text type='danger'>{error.message}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[DECODE] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync[DECODE]}
								onClick={() => handleConversion(DECODE, decodeInput)}
							>
								Decode
							</Button>
							<Checkbox
								label='Auto Decode'
								checked={autoSync[DECODE]}
								onChange={(e) => setAutoSync((prev) => ({ ...prev, [DECODE]: !prev[DECODE] }))}
								style={{ alignSelf: 'center' }}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(DECODE)}
									unstyled
									c={settings.includes(DECODE) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(DECODE) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== DECODE ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy2 ? 'filled' : 'default'}
									onClick={() => handleCopy(DECODE)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !decodeInput })}
									disabled={!decodeInput}
									px={10}
									ref={refCopy2}
								>
									{copyStatus.type !== DECODE ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload2 ? 'filled' : 'default'}
									onClick={() => handleDownload(DECODE)}
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
						hidden={!settings.includes(DECODE)}
					>
						<Group
							spacing={0}
							gap={10}
						>
							<Select
								placeholder='Pick a charset'
								data={[defaultOption, ...CHARSET_OPTIONS]}
								comboboxProps={{ dropdownPadding: 5 }}
								onChange={(value) => handleCharsetChange(DECODE, value)}
								allowDeselect={false}
								searchable
							/>
						</Group>

						<Group
							spacing={0}
							gap={10}
						>
							<FileButton
								onChange={(e) => handleFileUpload(DECODE, e)}
								accept='image/png,image/jpeg'
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

							<Tooltip
								label={showQRCode.includes(DECODE) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr2 || showQRCode.includes(DECODE) ? 'filled' : 'default'}
									// variant={showQRCode.includes(DECODE) ? 'filled' : 'default'}
									onClick={() => handleQRCode(DECODE)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(DECODE) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
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
