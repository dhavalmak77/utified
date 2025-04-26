import React, { useState, useCallback, useEffect } from 'react';
import { Button, Tooltip } from '@mantine/core';
import { TbCopy, TbCopyCheck } from 'react-icons/tb';
import useUtHovers from '@/app/_hooks/useUtHovers';

const initialCopyStatus = { isSuccess: false, hasError: false, toggle: false };

const CopyButton = ({ textToCopy, disabled, label }) => {
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);
	const { hovers, refs } = useUtHovers(['copy']);

	useEffect(() => {
		if (copyStatus.hasError || copyStatus.isSuccess) {
			const timeoutId = setTimeout(() => {
				setCopyStatus(initialCopyStatus);
			}, 3000);

			return () => clearTimeout(timeoutId);
		}
	}, [copyStatus]);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopyStatus({ isSuccess: true, hasError: false, toggle: !copyStatus.toggle });
		} catch (err) {
			console.error('Failed to copy text: ', err);
			setCopyStatus({ isSuccess: false, hasError: true, toggle: !copyStatus.toggle });
		}
	}, [copyStatus.toggle, textToCopy]);

	return (
		<Tooltip label={copyStatus.isSuccess ? 'Copied' : copyStatus.hasError ? 'Error copying' : 'Copy'}>
			<Button
				variant={hovers.copy ? 'filled' : 'default'}
				onClick={handleCopy}
				disabled={disabled}
				{...refs.copy}
				px={10}
			>
				{copyStatus.isSuccess ? <TbCopyCheck size={16} /> : <TbCopy size={16} />}
			</Button>
		</Tooltip>
	);
};

export default CopyButton;
