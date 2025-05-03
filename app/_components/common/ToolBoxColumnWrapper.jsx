import cn from '@/app/_lib/utils/cn';
import { Box } from '@mantine/core';

const ToolBoxColumnWrapper = ({ children, error = null }) => {
	return <Box className={cn('p-4 rounded-md rounded-r-none flex-1 flex flex-col gap-4', error && 'gap-0')}>{children}</Box>;
};

export default ToolBoxColumnWrapper;
