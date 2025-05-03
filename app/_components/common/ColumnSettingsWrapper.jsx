import { Box } from '@mantine/core';

const ColumnSettingsWrapper = ({ children }) => {
	return <Box className='flex flex-col gap-4'>{children}</Box>;
};

export default ColumnSettingsWrapper;
