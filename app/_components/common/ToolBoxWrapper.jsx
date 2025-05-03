import { Box } from "@mantine/core";

const ToolBoxWrapper = ({ children }) => {
	return (
		// <div className='h-auto w-full bg-slate-100 dark:bg-[#272727] border border-[#ced4da] dark:border-[var(--app-shell-border-color)] flex rounded-md md:divide-x md:divide-[#ced4da] dark:md:divide-[var(--app-shell-border-color)] md:flex-row flex-col'>
		// 	{children}
		// </div>
		<Box className='h-auto w-full border flex rounded-md md:divide-x md:divide-[var(--app-shell-border-color)] md:flex-row flex-col border-[var(--app-shell-border-color)]'>
			{children}
		</Box>
	);
};

export default ToolBoxWrapper;
