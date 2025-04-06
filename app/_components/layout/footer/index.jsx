import { AppShell, Text } from '@mantine/core';

const AppFooter = () => {
	return (
		<AppShell.Footer
			p='md'
			align='center'
		>
			<Text
				size='sm'
				color='dimmed'
			>
				© {new Date().getFullYear()} Utified — Built with &hearts; and codes.
			</Text>
			{/* &copy; {new Date().getFullYear()} Utified · Built with care and code. */}
		</AppShell.Footer>
	);
}

export default AppFooter;