import { Button, Tooltip } from '@mantine/core';
import useUtHovers from '@/app/_hooks/useUtHovers';
import { TbSettingsMinus, TbSettingsPlus } from 'react-icons/tb';

const SettingsButton = ({ label = 'Settings', display, onClick, disabled, size = 16 }) => {
	const { hovers, refs } = useUtHovers(['settings']);

	return (
		<Tooltip
			label={label}
			withArrow
			arrowSize={8}
		>
			<Button
				unstyled
				onClick={onClick}
				disabled={disabled}
				c={hovers.settings || display ? 'blue' : ''}
				p={10}
				{...refs.settings}
			>
				{display ? <TbSettingsMinus size={size} /> : <TbSettingsPlus size={size} />}
			</Button>
		</Tooltip>
	);
};

export default SettingsButton;
