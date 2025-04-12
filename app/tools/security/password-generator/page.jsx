'use client';

import { Indicator } from '@mantine/core';
import { PageWrapper } from "@/app/_components/layout/page-wrapper";
import cn from "@/app/_lib/utils/cn";
import { Button, Checkbox, Slider, Input, Tooltip, Text, NumberInput } from '@mantine/core';
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import { TbCopy, TbCopyCheck, TbLock, TbQrcode, TbRefresh } from "react-icons/tb";
import { usePathname } from 'next/navigation';

const initialCopyStatus = { isSuccess: false, hasError: false, toggle: false };
const strengthConfigs = {
	// 'Error! Please enable any protection level checkbox': '#ff4d4f',
	'Password!': {
		// color: '#ff4d4f',
		color: '#95a5a6',
		colorClass: 'text-[#95a5a6]',
		progress: 0,
		widthClass: 'w-[0%]',
		borderColorClass: 'border-[#95a5a6]',
	},
	'Very Weak': {
		// color: '#ff4d4f',
		color: '#e74c3c',
		colorClass: 'text-[#e74c3c]',
		progress: 10,
		widthClass: 'w-[10%]',
		borderColorClass: 'border-[#e74c3c]',
	},
	Weak: {
		// color: '#ffa940',
		color: '#e67e22',
		colorClass: 'text-[#e67e22]',
		progress: 25,
		widthClass: 'w-[25%]',
		borderColorClass: 'border-[#e67e22]',
	},
	Medium: {
		// color: '#ff9800',
		color: '#f39c12',
		colorClass: 'text-[#f39c12]',
		progress: 50,
		widthClass: 'w-[50%]',
		borderColorClass: 'border-[#f39c12]',
	},
	Strong: {
		// color: '#52c41a',
		color: '#27ae60',
		colorClass: 'text-[#27ae60]',
		progress: 75,
		widthClass: 'w-[75%]',
		borderColorClass: 'border-[#27ae60]',
	},
	'Very Strong': {
		// color: '#1890ff',
		color: '#1890ff',
		colorClass: 'text-[#1890ff]',
		progress: 99.65,
		widthClass: 'w-[99.65%]',
		borderColorClass: 'border-[#1890ff]',
	},
};


const PasswordGenerator = () => {
	const [length, setLength] = useState(12);
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const [password, setPassword] = useState('');
	const [strength, setStrength] = useState('');
	const [qrValue, setQrValue] = useState('');
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [showQRCode, setShowQRCode] = useState(false);
	const [loading, setLoading] = useState(true);

	const pathname = usePathname();

	useEffect(() => {
		if (copyStatus.hasError || copyStatus.isSuccess) {
			const timeoutId = setTimeout(() => {
				setCopyStatus(initialCopyStatus);
			}, 3000);

			return () => clearTimeout(timeoutId);
		}
	}, [copyStatus, pathname]);

	useEffect(() => {
		generatePassword();
		setLoading(false);
	}, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

	useEffect(() => {
		if (showQRCode) {
			const qrCodeId = setTimeout(() => {
				setQrValue(password);
			}, 750);

			return () => clearTimeout(qrCodeId);
		}

		setCopyStatus((prev) => ({ ...prev, isSuccess: false }));
	}, [password, showQRCode, pathname]);

	const calculateStrength = (password) => {
		let score = 0;

		if (password.length > 8) score++;
		if (password.length > 12) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[a-z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[!@#$%^&*()_+[\]{};:,.<>?]/.test(password)) score++;

		switch (score) {
			case 6:
				setStrength('Very Strong');
				break;
			case 5:
				setStrength('Strong');
				break;
			case 3:
			case 4:
				setStrength('Medium');
				break;
			case 2:
				setStrength('Weak');
				break;
			case 0:
				setStrength('No Password');
				break;
			default:
				setStrength('Very Weak');
				break;
		}
	};

	const generatePassword = () => {
		const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
		const numberChars = '0123456789';
		const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

		let characters = '';
		if (includeUppercase) characters += uppercaseChars;
		if (includeLowercase) characters += lowercaseChars;
		if (includeNumbers) characters += numberChars;
		if (includeSymbols) characters += symbolChars;

		if (characters.length === 0) {
			// setStrength('Error! Please enable any protection level checkbox');
			return;
		}

		let result = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters[randomIndex];
		}

		setPassword(result);
		calculateStrength(result); // Update strength after generating password
	};

	// Copy Handler
	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(password);
			setCopyStatus({ isSuccess: true, hasError: false, toggle: !copyStatus.toggle });
		} catch (err) {
			console.error('Failed to copy text: ', err);
			setCopyStatus({ isSuccess: false, hasError: true, toggle: !copyStatus.toggle });
		}
	}, [copyStatus.toggle, password]);

	return (
		<PageWrapper
			title='Password Generator'
			description='Generate a strong, secure password to ensure maximum security with customizable options for length and complexity.'
			aside={<Text>Aside</Text>}
		>
			<Indicator
				inline
				label={strength}
				position='top-start'
				// offset={8}
				radius='sm'
				size={24}
				className='w-full'
				variant='filled'
				mt={10}
				// color={strengthConfigs[strength]?.borderColorClass}
				color={strengthConfigs[strength]?.color}
				styles={{
					indicator: {
						left: strength.length * 2.5,
					},
				}}
			>
				<div className='flex flex-col rounded items-center justify-center text-center border border-gray-300 overflow-hidden'>
					<div className={cn('absolute border-t self-start top-0 transition-[width] duration-[1.5s] rounded-full z-10', strengthConfigs[strength]?.widthClass, strengthConfigs[strength]?.borderColorClass)} />
					{showQRCode && qrValue && (
						<div className='pt-4 w-full mx-0 text-center flex justify-center bg-[#F0F0F0]'>
							<QRCodeSVG
								value={qrValue}
								size={128}
								level='L'
								className='p-1 border border-gray-300'
							/>
						</div>
					)}
					<div className='flex w-full text-center items-center bg-[#F0F0F0] p-3'>
						<Input
							variant='unstyled'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								calculateStrength(e.target.value);
								setLength(e.target.value.length);
							}}
							size='md'
							w='100%'
							rightSectionWidth={120}
							placeholder='Password...'
							className='rounded-md font-semibold h-full w-full'
							leftSection={
								<TbLock
									className={cn('pr-0.5', strengthConfigs[strength]?.colorClass)}
									size={22}
								/>
							}
							rightSection={
								<div
									className='flex items-center -ml-3 gap-4 mr-10'
									style={{ pointerEvents: 'all' }}
								>
									<Tooltip
										label={showQRCode ? 'QR Code is active' : 'QR Code'}
										withArrow
										arrowSize={8}
									>
										<Button
											unstyled
											onClick={() => setShowQRCode((p) => !p)}
											className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
										>
											<TbQrcode size={20} />
										</Button>
									</Tooltip>
									<Tooltip
										label={copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}
										withArrow
										arrowSize={8}
									>
										<Button
											// type='text'
											// variant='default'
											unstyled
											onClick={handleCopy}
											className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
										>
											{!copyStatus.isSuccess ? <TbCopy size={20} /> : <TbCopyCheck size={20} />}
										</Button>
									</Tooltip>
									<Button
										onClick={generatePassword}
										px={0}
										// unstyled
										variant='transparent'
										className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
									>
										<TbRefresh size={20} />
										&nbsp;Refresh
									</Button>
								</div>
							}
						/>
					</div>
					<div className='grid grid-cols-12 w-full select-none border-t border-gray-300'>
						<div className='flex col-span-6 border-r border-gray-300 p-4 items-center justify-center w-full gap-0'>
							<Slider
								min={1}
								max={100}
								value={length}
								onChange={(value) => setLength(value)}
								className='w-full'
							/>
							<NumberInput
								value={length}
								min={1}
								max={100}
								onChange={(value) => setLength(value)}
								step={1}
								className={cn({
									'w-[100px]': length <= 9,
									'w-[105px]': length >= 10 && length <= 99,
									'w-[115px]': length >= 100,
								})}
								rightSection={
									<Text
										size='sm'
										c='black'
									>
										Length
									</Text>
								}
								rightSectionWidth={60}
								// w={115}
								miw={95}
								variant='transparent'
								hideControls
							/>
							{/* <Text className='-ml-2 p-0 w-16'>Length</Text> */}
							{/* <Text pt={0.75} ml={5}>Length</Text> */}
						</div>
						<div className='flex col-span-6 p-4 items-center justify-between w-full'>
							<Checkbox
								checked={includeUppercase}
								onChange={(e) => setIncludeUppercase(e.target.checked)}
								label='Uppercase'
							/>
							<Checkbox
								checked={includeLowercase}
								onChange={(e) => setIncludeLowercase(e.target.checked)}
								label='Lowercase'
							/>
							<Checkbox
								checked={includeNumbers}
								onChange={(e) => setIncludeNumbers(e.target.checked)}
								label='Numbers'
							/>
							<Checkbox
								checked={includeSymbols}
								onChange={(e) => setIncludeSymbols(e.target.checked)}
								label='Symbols'
							/>
						</div>
					</div>
				</div>
			</Indicator>
		</PageWrapper>
	);
};

export default PasswordGenerator;
