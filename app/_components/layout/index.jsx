'use client';

import { AppShell, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppHeader from './header';
import AppSiderLeft from './sidebar-left';
import AppRightSider from './sidebar-right';
import { usePathname } from 'next/navigation';
import { AppContentArea } from './content-area';
import { useEffect } from 'react';

export const AppLayout = ({ children }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const { colorScheme, setColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});

	const path = usePathname();
	// const breadcrumbItems = breadcrumbPath(HEADER_NAVIGATION, path);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key.toLowerCase() === 'b') {
				event.preventDefault(); // prevent browser default (like bold in editors)
				toggleDesktop();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleDesktop]);

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			// aside={{
			//     width: 300,
			//     breakpoint: 'md',
			//     collapsed: { desktop: false, mobile: true }
			// }}
			// footer={{ height: 60 }}
		>
			{/* Header */}
			<AppHeader
				mobileOpened={mobileOpened}
				toggleMobile={toggleMobile}
				desktopOpened={desktopOpened}
				toggleDesktop={toggleDesktop}
			/>

			{/* Left Sidebar */}
			<AppSiderLeft />

			{/* Main Content */}
			{/* <AppContentArea children={children} /> */}
			{children}

			{/* Right Sidebar */}
			{/* <AppRightSider /> */}
		</AppShell>
	);
}