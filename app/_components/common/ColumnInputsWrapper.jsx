import { Box } from '@mantine/core';
import ErrorMessage from './ErrorMessage';

const ColumnInputsWrapper = ({ children, error = false }) => {
	if (error !== false) {
		return (
			<Box className='flex flex-col w-full gap-0'>
				<Box className='flex w-full gap-0 items-end'>{children}</Box>
				<ErrorMessage
					style={{ fontSize: '11px' }}
					value={error}
				/>
			</Box>
		);
	}

	return <Box className='flex w-full gap-0 items-end'>{children}</Box>;
};

export default ColumnInputsWrapper;
