import { Textarea } from '@mantine/core';
import useUtHovers from '@/app/_hooks/useUtHovers';
import ClearButton from './ClearButton';
import cn from '@/app/_lib/utils/cn';

const UtTextarea = ({
	label = 'Label',
	description = 'Enter text',
	placeholder = 'Write text...',
	className = '',
	rows = 5,
	w = '100%',
	radius = 'md',
	size = 'md',
	value = '',
	setValue = () => {},
	onChange = () => {},
	showQRCode,
	qrValue,
	clear = true,
	rightSection,
	rightSectionWidth = 24,
	disabled,
	required,
	error,
	...props
}) => {
	const { hovers, refs } = useUtHovers(['textarea']);

	if (clear !== false) {
		rightSection = (
			<ClearButton
				value={value}
				onClick={() => setValue('')}
			/>
		);
	}

	return (
		<Textarea
			// c={hovers.textarea ? 'blue' : ''}
			label={label}
			description={description}
			size={size}
			rows={rows}
			w={w}
			className={cn(showQRCode && qrValue.length ? 'active-qr' : '', className)}
			placeholder={placeholder}
			radius={radius}
			value={value}
			onChange={onChange}
			error={error}
			errorProps={{ size: 'md' }}
			rightSectionWidth={rightSectionWidth}
			rightSection={rightSection}
			disabled={disabled}
			required={required}
			{...refs.textarea}
			{...props}
		/>
	);
};

export default UtTextarea;
