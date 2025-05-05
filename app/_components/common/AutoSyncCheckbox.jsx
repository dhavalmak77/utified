import { Checkbox } from '@mantine/core';

const AutoSyncCheckbox = ({ label = 'Auto Sync', checked, onChange, ...props }) => {
	return (
		<Checkbox
			label={label}
			checked={checked}
			onChange={onChange}
			{...props}
			className='select-none'
		/>
	);
};

export default AutoSyncCheckbox;
