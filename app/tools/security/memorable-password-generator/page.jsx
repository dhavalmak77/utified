'use client';

import { PageWrapper } from '@/app/_components/layout/page-wrapper';
import cn from '@/app/_lib/utils/cn';
import { Button, Checkbox, Slider, Input, Tooltip, Text, NumberInput } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useEffect, useState } from 'react';
import { TbCopy, TbCopyCheck, TbLock, TbQrcode, TbRefresh, TbSeparator } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import { wordList } from '@/app/_data/word-list';

const initialCopyStatus = { isSuccess: false, hasError: false, toggle: false };

export const MemorablePasswordGenerator = () => {
	const [length, setLength] = useState(3);
	const [transform, setTransform] = useState('');
	const [password, setPassword] = useState('');
	const [qrValue, setQrValue] = useState('');
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const [showQRCode, setShowQRCode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [separator, setSeparator] = useState('-');

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
	}, [length, transform, separator]);

	useEffect(() => {
		if (showQRCode) {
			const qrCodeId = setTimeout(() => {
				setQrValue(password);
			}, 750);

			return () => clearTimeout(qrCodeId);
		}

		setCopyStatus((prev) => ({ ...prev, isSuccess: false }));
	}, [password, showQRCode, pathname]);

	const generatePassword = () => {
		let characters = wordList;
		if (characters.length === 0) {
			return;
		}

		let result = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			
			if (transform === 'capitalizeWords') {
				result += characters[randomIndex].charAt(0).toUpperCase() + characters[randomIndex].slice(1);
			} else {
				result += characters[randomIndex];
			}

			result += separator;
		}

		if (separator.length > 0) {
			result = result.slice(0, -separator.length);
		}

		if (transform === 'capitalizeFirstLetter') {
			result = result.charAt(0).toUpperCase() + result.slice(1);
		}

		if (transform === 'uppercase') {
			result = result.toUpperCase();
		}

		setPassword(result);
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
			title='Memorable Password Generator'
			description='Generate a memorable password with a mix of words, numbers, and symbols.'
			aside={<Text></Text>}
		>
			<div className='flex flex-col rounded items-center justify-center text-center border border-gray-300 overflow-hidden'>
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
							setLength(e.target.value.length);
						}}
						size='md'
						w='100%'
						rightSectionWidth={120}
						placeholder='Password...'
						className='rounded-md font-semibold h-full w-full'
						leftSection={
							<TbLock
								className={cn('pr-0.5')}
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
							max={15}
							value={length}
							onChange={(value) => setLength(value)}
							className='w-full'
						/>
						<NumberInput
							value={length}
							min={1}
							max={15}
							onChange={(value) => setLength(value)}
							step={1}
							className={cn({
								'w-[80px]': length <= 9,
								'w-[85px]': length >= 10 && length <= 99,
								'w-[95px]': length >= 100,
							})}
							rightSection={
								<Text
									size='sm'
									c='black'
								>
									Words
								</Text>
							}
							rightSectionWidth={40}
							// w={115}
							miw={75}
							variant='transparent'
							hideControls
						/>
						{/* <Text className='-ml-2 p-0 w-16'>Length</Text> */}
						{/* <Text pt={0.75} ml={5}>Length</Text> */}
					</div>
					<div className='flex flex-col col-span-6 p-4 items-start justify-start w-full gap-4'>
						<div className='flex items-center gap-4.5'>
							<Text fw={500}>Transform:</Text>
							<Checkbox
								checked={transform === 'capitalizeFirstLetter'}
								onChange={(e) => setTransform(e.target.checked ? 'capitalizeFirstLetter' : '')}
								label='Capitalize First Letter'
							/>
							<Checkbox
								checked={transform === 'capitalizeWords'}
								onChange={(e) => setTransform(e.target.checked ? 'capitalizeWords' : '')}
								label='Capitalize Words'
							/>
							<Checkbox
								checked={transform === 'uppercase'}
								onChange={(e) => setTransform(e.target.checked ? 'uppercase' : '')}
								label='Uppercase'
							/>
						</div>
						<div className='flex items-center justify-start text-left gap-2'>
							<Text fw={500} c="black">Separator: </Text><Input w={80} value={separator} onChange={(e) => setSeparator(e.target.value)} />
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default MemorablePasswordGenerator;
