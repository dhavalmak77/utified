import React, { useCallback } from 'react';
import { Button, Tooltip } from '@mantine/core';
import { TbDownload } from 'react-icons/tb';
import useUtHovers from '@/app/_hooks/useUtHovers';

const DownloadButton = ({ data, fileNamePrefix = 'file', fileExtension = 'txt', tooltipLabel = 'Download', disabled = false }) => {
    const { hovers, refs } = useUtHovers(['download']);

	const handleDownload = useCallback(() => {
		const blob = new Blob([data], { type: `text/plain;charset=utf-8` });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${fileNamePrefix.toLowerCase()}.${fileExtension}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [data, fileNamePrefix, fileExtension]);

	return (
		<Tooltip
			label={tooltipLabel}
			withArrow
			arrowSize={8}
		>
			<Button
				variant={hovers.download ? 'filled' : 'default'}
				onClick={handleDownload}
				disabled={disabled}
				px={10}
				{...refs.download}
			>
				<TbDownload size={16} />
			</Button>
		</Tooltip>
	);
};

export default DownloadButton;
