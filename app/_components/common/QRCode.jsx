import cn from '@/app/_lib/utils/cn';
import { Box, Button, Text } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { TbExclamationCircle, TbQrcodeOff } from 'react-icons/tb';

export default function QRCode({ value, maxLength = 1000, size = 126, onClick }) {
	if (!value) return null;

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
				{exceeded && <Box className='flex flex-col items-center justify-center text-center h-full w-full px-2 z-50'>
					<Box c={'red.6'} className='flex items-center justify-center gap-2 text-sm mb-2 font-semibold'>
						<span className='flex items-center justify-center gap-0.5'>
							<TbExclamationCircle size={16} /> <Text size='sm' fw={600}>Input too long</Text>
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
						rightSection={<TbQrcodeOff size={18} style={{ marginLeft: -5 }} />}
					>
						Dismiss QR
					</Button>
				</Box>}
			</div>
		</div>
	);
}
