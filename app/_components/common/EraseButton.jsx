import { Button, Tooltip } from '@mantine/core';
import useUtHovers from '@/app/_hooks/useUtHovers';
import { LuEraser } from 'react-icons/lu';

const EraseButton = ({ label = 'Clear Fields', display, onClick, disabled, size = 16 }) => {
	const { hovers, refs } = useUtHovers(['erase']);

	return (
		<Tooltip
			label={label}
			withArrow
			arrowSize={8}
		>
			<Button
				variant={hovers.erase ? 'filled' : 'default'}
				onClick={onClick}
				disabled={disabled}
				px={10}
				{...refs.erase}
			>
				<LuEraser size={size} />
			</Button>
		</Tooltip>
	);
};

export default EraseButton;
