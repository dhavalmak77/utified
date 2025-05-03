import { Button } from '@mantine/core';

const SubmitButton = ({ children, title = 'Submit', onClick, disabled, loading, ...props }) => {
	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			loading={loading}
			loaderProps={{ type: 'dots' }}
			{...props}
		>
			{children || title}
		</Button>
	);
};

export default SubmitButton;
