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
import Papa from 'papaparse';

const initialCopyStatus = { type: '', isSuccess: false, hasError: false, toggle: false };
const initialErrorState = { type: '', message: '' };
const defaultOption = {
	label: 'UTF-8 (Deafult)',
	value: '',
};

const __JSON = 'JSON';
const __OBJECT = 'TSV';

const maxQrCodeLength = 2953;

export default function Base64() {
	const theme = useMantineTheme();

	const [encodeInput, setEncodeInput] = useState('');
	const [decodeInput, setDecodeInput] = useState('');
	const [useTabs, setUseTabs] = useState('');
	const [tabSpace, setTabSpace] = useState(2);
	const [autoSync, setAutoSync] = useState(false);
	const [error, setError] = useState('');
	const [history, setHistory] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [qrValues, setQrValues] = useState({ [__JSON]: '', [__OBJECT]: '' });
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [settings, setSettings] = useState([__JSON]);
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
		if (showQRCode.includes(__JSON) || showQRCode.includes(__OBJECT)) {
			const qrCodeId = setTimeout(() => {
				setQrValues({
					[__JSON]: encodeInput,
					[__OBJECT]: decodeInput,
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

	// Function to flatten nested JSON objects
	const flattenJson = (obj, prefix = '') => {
		let result = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				const newKey = prefix ? `${prefix}.${key}` : key;
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					Object.assign(result, flattenJson(value, newKey));
				} else if (Array.isArray(value)) {
					result[newKey] = JSON.stringify(value); // Convert arrays to JSON strings
				} else {
					result[newKey] = value;
				}
			}
		}
		return result;
	};

	const jsonToTsv = (json) => {
		const arrayToTsv = (arr) => {
			if (arr.length === 0) return '';

			const columns = Object.keys(arr[0]);
			const header = columns.join('\t');
			const rows = arr.map((row) =>
				columns
					.map(
						(col) => (row[col] != null ? (typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]) : '') // Handle null or undefined values
					)
					.join('\t')
			);

			return [header, ...rows].join('\n');
		};

		if (Array.isArray(json)) {
			return arrayToTsv(json);
		} else if (typeof json === 'object') {
			return arrayToTsv([json]);
		} else {
			setError('Unsupported JSON format');
		}
	};

	const handleConversion = () => {
		setError('');
		try {
			const parsedJson = JSON.parse(encodeInput);
			const tsv = jsonToTsv(parsedJson);
			setDecodeInput(tsv);
		} catch (err) {
			setError('Invalid JSON format.');
			setDecodeInput('');
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
				const textToCopy = conversionType === __JSON ? encodeInput : decodeInput;
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
			const decodeInput = typeIdentity === __JSON ? encodeInput : decodeInput;
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
		(file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setEncodeInput(e.target.result);
				handleConversion();
			};
			reader.readAsText(file);
		},
		[handleConversion]
	);

	useEffect(() => {
		if (autoSync) {
			handleConversion();
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
			title='JSON to TSV Converter'
			description='Convert JSON data to TSV easily.'
			aside={true}
		>
			{/* Common Card */}
			<div className='h-auto w-full bg-slate-100 border border-[#ced4da] flex rounded-md divide-x divide-[#ced4da]'>
				{/* First column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4 w-full'>
					<div className='flex w-full gap-0 items-end'>
						{/* Input */}
						<Textarea
							label='JSON'
							description='Enter JSON to convert'
							size='md'
							rows={10}
							w={'100%'}
							className={showQRCode.includes(__JSON) && qrValues[__JSON].length ? 'active-qr' : ''}
							placeholder='Enter JSON or upload a file'
							radius='md'
							value={encodeInput}
							error=''
							onChange={(e) => {
								if (autoSync) {
									handleConversion();
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
						{showQRCode.includes(__JSON) && qrValues[__JSON] && (
							<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
								<QRCodeSVG
									size={250}
									value={qrValues[__JSON].slice(0, 1000)}
									level='L'
									bordered='false'
									status={qrValues[__JSON].length > 1000 ? 'length-error' : 'active'}
								/>
							</div>
						)}
					</div>
					{error && <Text type='danger'>{error}</Text>}

					<Group justify='space-between'>
						<Group>
							<Button
								variant='filled'
								// className={cn(!autoSync[__JSON] && 'rounded-md py-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white')}
								disabled={autoSync}
								onClick={() => handleConversion()}
							>
								Convert
							</Button>
							<Checkbox
								label='Auto Convert'
								checked={autoSync}
								onChange={(e) => setAutoSync((prev) => !prev)}
								style={{ alignSelf: 'center' }}
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(__JSON)}
									unstyled
									c={settings.includes(__JSON) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(__JSON) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== __JSON ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy1 ? 'filled' : 'default'}
									onClick={() => handleCopy(__JSON)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !encodeInput })}
									disabled={!encodeInput}
									px={10}
									ref={refCopy1}
								>
									{copyStatus.type !== __JSON ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload1 ? 'filled' : 'default'}
									onClick={() => handleDownload(__JSON)}
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
						hidden={!settings.includes(__JSON)}
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
								onChange={(e) => handleFileUpload(e)}
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
								label={showQRCode.includes(__JSON) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr1 || showQRCode.includes(__JSON) ? 'filled' : 'default'}
									// variant={showQRCode.includes(__JSON) ? 'filled' : 'default'}
									onClick={() => handleQRCode(__JSON)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(__JSON) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
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
								label='TSV'
								description='Converted TSV will appear here'
								size='md'
								rows={10}
								w={'100%'}
								className={showQRCode.includes(__OBJECT) && qrValues[__OBJECT].length ? 'active-qr' : ''}
								placeholder='Converted TSV will appear here'
								radius='md'
								value={decodeInput}
								error=''
								onChange={(e) => {
									if (autoSync[__OBJECT]) {
										handleConversion(__OBJECT, e.target.value);
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
							{showQRCode.includes(__OBJECT) && qrValues[__OBJECT] && (
								<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
									<QRCodeSVG
										size={250}
										value={qrValues[__OBJECT].slice(0, 1000)}
										level='L'
										bordered='false'
										status={qrValues[__OBJECT].length > 1000 ? 'length-error' : 'active'}
									/>
								</div>
							)}
						</div>
					</Group>

					<Group justify='space-between'>
						<Group>
							<Checkbox
								label='Use tabs'
								checked={useTabs}
								onChange={(e) => setUseTabs(e.target.checked)}
								style={{ alignSelf: 'center' }}
							/>
							<NumberInput
								value={tabSpace}
								min={1}
								max={8}
								onChange={(value) => setTabSpace((prev) => (!value ? prev : Math.floor(value)))}
								step={1}
								className={cn('w-[122px]')}
								rightSection={
									<Text
										size='sm'
										c='black'
									>
										Indent size
									</Text>
								}
								rightSectionWidth={100}
								// w={115}
								miw={95}
								// variant='transparent'
								hideControls
							/>
						</Group>
						<Group
							spacing={0}
							gap={10}
						>
							<Tooltip label='Settings'>
								<Button
									onClick={() => handleSettings(__OBJECT)}
									unstyled
									c={settings.includes(__OBJECT) ? 'blue' : ''}
									p={10}
								>
									{settings.includes(__OBJECT) ? <TbSettingsMinus size={16} /> : <TbSettingsPlus size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label={copyStatus.type !== __OBJECT ? 'Copy' : copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
								<Button
									variant={hoveredCopy2 ? 'filled' : 'default'}
									onClick={() => handleCopy(__OBJECT)}
									// className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !decodeInput })}
									disabled={!decodeInput}
									px={10}
									ref={refCopy2}
								>
									{copyStatus.type !== __OBJECT ? <TbCopy size={16} /> : <TbCopyCheck size={16} />}
								</Button>
							</Tooltip>
							<Tooltip label='Download'>
								<Button
									variant={hoveredDownload2 ? 'filled' : 'default'}
									onClick={() => handleDownload(__OBJECT)}
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
						hidden={!settings.includes(__OBJECT)}
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
								label={showQRCode.includes(__OBJECT) ? 'QR Code is active' : 'QR Code'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredQr2 || showQRCode.includes(__OBJECT) ? 'filled' : 'default'}
									// variant={showQRCode.includes(__OBJECT) ? 'filled' : 'default'}
									onClick={() => handleQRCode(__OBJECT)}
									className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									leftSection={showQRCode.includes(__OBJECT) ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
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
						onClick={() => handleConversion(el.value, text)}
					>
						{el.label}
					</Button>
				))}
			</div> */}
		</PageWrapper>
	);
}
