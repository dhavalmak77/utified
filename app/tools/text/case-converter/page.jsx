'use client';

import { ActionIcon, Button, FileButton, Group, Text, Textarea, Tooltip } from '@mantine/core';
import { convertTextCase, textTranformations } from './convert-utils';
import cn from '@/app/_lib/utils/cn';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LuCopy, LuClipboardCopy, LuUpload, LuX, LuCopyCheck, LuDownload, LuEraser } from 'react-icons/lu';

import { useHover } from '@mantine/hooks';
import { PageWrapper } from '@/app/_components/layout/page-wrapper';

const caseButtons = Object.entries(textTranformations).map(([key, el]) => ({ label: el.label, value: key }));
const isCopiedInitial = { status: false, error: false, toggle: false };

export default function TextCaseConverter() {
	const [text, setText] = useState('');
	const [result, setResult] = useState('');
	const [caseType, setCaseType] = useState('');
	const [isCopied, setIsCopied] = useState(isCopiedInitial);
	const [clearInput, setClearInput] = useState(false);
	const [clearOutput, setClearOutput] = useState(false);

	const { hovered: hoveredTakeOutputAsInput, ref: refTakeOutputAsInput } = useHover();
	const { hovered: hoveredUploadFile, ref: refUploadFile } = useHover();
	const { hovered: hoveredOutputCopy, ref: refOutputCopy } = useHover();
	const { hovered: hoveredOutputDownload, ref: refOutputDownload } = useHover();
	const { hovered: hoveredClearBoth, ref: refClearBoth } = useHover();

	useEffect(() => {
		if (isCopied.error || isCopied.status) {
			const isCopiedId = setTimeout(() => {
				setIsCopied(isCopiedInitial);
			}, 5000);

			return () => clearTimeout(isCopiedId);
		}
	}, [isCopied]);

	const handleConvert = useCallback((caseType, inputText) => {
		if (!caseType) return;

		setCaseType(caseType);
		const resultText = convertTextCase(caseType, inputText);
		setResult(resultText);
	}, []);

	useEffect(() => {
		handleConvert(caseType, text);
	}, [text]);

	const handleFileUpload = useCallback((file) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setText(e.target.result);
		};
		reader.readAsText(file);
		return false;
	}, []);

	const handleClear = useCallback(() => {
		setText('');
		setResult('');
	}, []);

	const handleDownload = useCallback(() => {
		const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `transformed-text-${caseType}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [caseType, result]);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(result);
			setIsCopied((prev) => ({ ...prev, status: true, error: false, toggle: !prev.toggle }));
		} catch (err) {
			console.error('Failed to copy text: ', err);
			setIsCopied((prev) => ({ ...prev, status: false, error: true, toggle: !prev.toggle }));
		}
	}, [result]);

	const handleSetResultInInput = useCallback(() => {
		setText(result);
	}, [result]);

	const handleUpload = useCallback(
		(file) => {
			handleFileUpload(file);
			return false; // Prevent default upload behavior
		},
		[handleFileUpload]
	);

	// Memoized handlers
	const memoizedDownloadHandler = useMemo(() => handleDownload, [handleDownload]);
	const memoizedCopyHandler = useMemo(() => handleCopy, [handleCopy]);
	const memoizedSetResultHandler = useMemo(() => handleSetResultInInput, [handleSetResultInInput]);

	return (
		<PageWrapper
			title='Text Case Converter'
			description='Convert text into various cases with ease.'
			aside={<Text
				fw={500}
				size='sm'
				mb='xs'
			></Text>}
		>
			{/* Common Card */}
			<div className='h-auto w-full bg-slate-100 border border-[#ced4da] flex rounded-md divide-x divide-[#ced4da]'>
				{/* First column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4'>
					{/* Input */}
					<Textarea
						label='Input'
						description='Enter text to convert'
						size='md'
						rows={6}
						placeholder='Write text or upload a file'
						radius='md'
						value={text}
						error=''
						onChange={(e) => setText(e.target.value)}
						rightSectionWidth={24}
						rightSection={
							text && (
								<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
									<Tooltip
										label='Clear input'
										withArrow
									>
										<ActionIcon
											variant='subtle'
											color='gray'
											onClick={() => setText('')}
											size='sm'
										>
											<LuX size={16} />
										</ActionIcon>
									</Tooltip>
								</div>
							)
						}
					/>

					<Group justify='space-between'>
						<FileButton
							onChange={handleUpload}
							accept='image/png,image/jpeg'
						>
							{(props) => (
								<Button
									variant={hoveredUploadFile ? 'filled' : 'default'}
									leftSection={<LuUpload />}
									ref={refUploadFile}
									{...props}
								>
									Upload File
								</Button>
							)}
						</FileButton>

						<Tooltip
							label='Take the output text as input'
							withArrow
							arrowSize={8}
						>
							<Button
								variant={hoveredTakeOutputAsInput ? 'filled' : 'default'}
								onClick={memoizedSetResultHandler}
								px={10}
								className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !result })}
								disabled={!result}
								ref={refTakeOutputAsInput}
							>
								<LuClipboardCopy size={16} />
							</Button>
						</Tooltip>
					</Group>
				</div>

				{/* Second column */}
				<div className='p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4'>
					{/* Output */}
					<Textarea
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
						size='md'
						rows={6}
						placeholder='Converted text will appear here'
						radius='md'
						value={result}
						error=''
						onChange={(e) => setResult(e.target.value)}
						rightSectionWidth={24}
						rightSection={
							text && (
								<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
									<Tooltip
										label='Clear input'
										withArrow
									>
										<ActionIcon
											variant='subtle'
											color='gray'
											onClick={() => setResult('')}
											size='sm'
										>
											<LuX size={16} />
										</ActionIcon>
									</Tooltip>
								</div>
							)
						}
					/>

					<Group justify='space-between'>
						<Group></Group>

						<Group gap={10}>
							<Tooltip
								label={isCopied.status ? 'Copied' : isCopied.error ? 'Error copying' : 'Copy'}
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredOutputCopy ? 'filled' : 'default'}
									onClick={memoizedCopyHandler}
									px={10}
									className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !result })}
									disabled={!result}
									ref={refOutputCopy}
								>
									{isCopied.status ? <LuCopyCheck size={16} /> : <LuCopy size={16} />}
								</Button>
							</Tooltip>
							<Tooltip
								label='Download'
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredOutputDownload ? 'filled' : 'default'}
									onClick={memoizedDownloadHandler}
									px={10}
									className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !result })}
									disabled={!result}
									ref={refOutputDownload}
								>
									<LuDownload size={16} />
								</Button>
							</Tooltip>
							<Tooltip
								label='Clear'
								withArrow
								arrowSize={8}
							>
								<Button
									variant={hoveredClearBoth ? 'filled' : 'default'}
									onClick={handleClear}
									px={10}
									className={cn('bg-blue-500 text-white border border-blue-500 transition-colors', 'hover:bg-white hover:text-blue-500 hover:border-blue-500', { 'opacity-50 cursor-not-allowed': !result })}
									disabled={!result}
									ref={refClearBoth}
								>
									<LuEraser size={16} />
								</Button>
							</Tooltip>
						</Group>
					</Group>
				</div>
			</div>

			<div className='flex flex-wrap gap-3 mt-4'>
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
			</div>
		</PageWrapper>
	);
}
