'use client';

import { AppShell } from '@mantine/core';
import React from 'react';
import AppBreadcrumbs from '../breadcrumbs';
import { usePathname } from 'next/navigation';

export const AppContentArea = ({ children }) => {
    const pathname = usePathname();

	return (
		<AppShell.Main>
			{/* Breadcrumbs */}
			<AppBreadcrumbs />

			{/* Page Content */}
			{children}
		</AppShell.Main>
	);
};
