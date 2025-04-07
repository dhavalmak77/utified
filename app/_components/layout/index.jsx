'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppHeader from './header';
import AppSiderLeft from './sidebar-left';
import AppRightSider from './sidebar-right';
import AppFooter from './footer';
import AppBreadcrumbs from './breadcrumbs';

export const AppLayout = ({ children }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
			footer={{ height: 60 }}
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
			<AppShell.Main>
				{children}
			</AppShell.Main>

			{/* Right Sidebar */}
			<AppRightSider />

			{/* Footer */}
			<AppFooter />
		</AppShell>
	);
}