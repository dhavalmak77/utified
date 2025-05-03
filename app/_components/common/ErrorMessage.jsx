import { Text } from '@mantine/core';

const ErrorMessage = ({ children, value, className, size = 'sm', c = 'red.6', ...props }) => {
	if (!children && !value) {
		return null;
	}

	return (
		<Text
			c={c}
			size={size}
			className={className}
			{...props}
		>
			{children || value}
		</Text>
	);
};

export default ErrorMessage;
