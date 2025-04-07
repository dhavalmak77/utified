'use client';

import { AppShell, Box } from '@mantine/core';
import React from 'react';
import AppBreadcrumbs from '../breadcrumbs';
import { usePathname } from 'next/navigation';
import { PageTitle } from '../../PageTitle';
import { PageDescription } from '../../PageDescription';
import cn from '@/app/_lib/utils/cn';

export const PageWrapper = ({
	children,
	breadcrumbs = true,
	title = '',
	description = '',
	className = ''
}) => {
	return (
		<AppShell.Main>
			<div className={cn('w-full h-full px-4 pt-2 pb-4', breadcrumbs && 'pt-4', className)}>
				{/* Breadcrumbs */}
				{breadcrumbs && <AppBreadcrumbs />}

				{/* Page title */}
				{title && <PageTitle>{title}</PageTitle>}

				{/* Page Description */}
				{description && <PageDescription>{description}</PageDescription>}

				{/* Page Content */}
				{children}
			</div>
		</AppShell.Main>
	);
};

export const AppContentArea = ({ children }) => {

	return (
		<AppShell.Main>
			{/* Breadcrumbs */}
			<AppBreadcrumbs />

			{/* Page Content */}
			{children}
		</AppShell.Main>
	);
};
