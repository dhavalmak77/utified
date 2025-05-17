import cn from '@/app/_lib/utils/cn';
import { Box, Button, Text } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { TbExclamationCircle, TbQrcodeOff } from 'react-icons/tb';

const rowSizes = {
	1: 26.8,
	2: 51.6,
	3: 76.4,
	4: 101.2,
	5: 126,
	6: 150.8,
	7: 175.6,
	8: 200.4,
	9: 225.2,
	10: 250
};
const defaultSize = rowSizes[2];

export default function QRCode({ value, rows = 0, maxLength = 1000, size = defaultSize, onClick }) {
	if (!value) return null;

	if (rows) {
		size = rowSizes[rows];
	}

	const exceeded = value.length > maxLength;

	return (
		<div className='border-t border-r border-b border-[#d9d9d9] rounded-tr-md rounded-br-md p-1.5'>
			<div style={{ width: size, height: size }}>
				<QRCodeSVG
					size={size}
					value={value.slice(0, maxLength)}
					level='L'
					className={cn(exceeded && 'absolute opacity-[0.10]')}
				/>
				{exceeded && (
					<Box className='flex flex-col items-center justify-center text-center h-full w-full px-2 z-50'>
						<Box
							c={'red.6'}
							className='flex items-center justify-center gap-2 text-sm mb-2 font-semibold'
						>
							<span className='flex items-center justify-center gap-0.5'>
								<TbExclamationCircle size={16} />{' '}
								<Text
									size='sm'
									fw={600}
								>
									Input too long
								</Text>
							</span>
						</Box>
						<Text
							size='sm'
							c='red.6'
							fw={600}
						>
							(limit {maxLength} chars)
						</Text>
						<Button
							variant='transparent'
							size='sm'
							onClick={onClick}
							rightSection={
								<TbQrcodeOff
									size={18}
									style={{ marginLeft: -5 }}
								/>
							}
						>
							Dismiss QR
						</Button>
					</Box>
				)}
			</div>
		</div>
	);
}
