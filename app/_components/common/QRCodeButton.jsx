import { Button, Tooltip } from '@mantine/core';
import useUtHovers from '@/app/_hooks/useUtHovers';
import { TbCircleCheck, TbQrcode } from 'react-icons/tb';

const QRCodeButton = ({ iconOnly, label, display, onClick, disabled, size = 18 }) => {
	const { hovers, refs } = useUtHovers(['qrCode']);

	if (!label) {
		label = display ? 'QR Code is active' : 'QR Code';
	}

	return (
		<Tooltip
			label={label}
			withArrow
			arrowSize={8}
		>
			{iconOnly ? (
				<Button
					variant={hovers.qrCode || display ? 'filled' : 'default'}
					onClick={onClick}
					disabled={disabled}
					{...refs.qrCode}
					px={10}
				>
					{display ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
				</Button>
			) : (
				<Button
					variant={hovers.qrCode || display ? 'filled' : 'default'}
					onClick={onClick}
					disabled={disabled}
					className='text-black border-none rounded-md bg-transparent hover:text-blue-500 shadow-none'
					leftSection={display ? <TbCircleCheck size={18} /> : <TbQrcode size={18} />}
					{...refs.qrCode}
				>
					QR Code
				</Button>
			)}
		</Tooltip>
	);
};

export default QRCodeButton;
