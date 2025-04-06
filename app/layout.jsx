import '@mantine/core/styles.css';
import '@/app/globals.css';

import { createTheme, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { AppLayout } from './_components/layout';

export const metadata = {
	title: 'Utified – Developer Utility Toolkit',
	description: 'Utified is a modern, user-friendly utility toolkit for developers. Perform encoding, decoding, JSON formatting, text transformations, and more – all in one fast and sleek interface.'
};

const theme = createTheme({
	headings: {
		textWrap: 'wrap'
	}
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>
					<AppLayout>{children}</AppLayout>
				</MantineProvider>
			</body>
		</html>
	);
}