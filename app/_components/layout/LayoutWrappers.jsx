'use client';

import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import { AppLayout } from '.';

const theme = createTheme({
	// primaryColor: 'bright-pink',
	// colors: {
	// 	'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
	// },
	// fontFamily: 'Verdana, sans-serif',
	// fontFamilyMonospace: 'Monaco, Courier, monospace',
	// headings: { fontFamily: 'Greycliff CF, sans-serif' },
	// components: {
	// 	Title: Title.extend({
	// 		classNames: {
	// 			root: classes.heading,
	// 		},
	// 	}),
	// },
	fontSizes: {},
	primary: virtualColor({
		name: 'primary',
		dark: 'pink',
		light: 'cyan'
	}),
	headings: {
		textWrap: 'wrap'
	},
});

export default function LayoutWrappers({ children }) {
	return (
		<MantineProvider theme={{ ...theme }}>
			<AppLayout>{children}</AppLayout>
		</MantineProvider>
	);
}
