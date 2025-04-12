'use client';

import { AppShell, Box, Paper, Text } from '@mantine/core';
import React, { useState } from 'react';
import AppBreadcrumbs from '../breadcrumbs';
import { usePathname } from 'next/navigation';
import { PageTitle } from '../../PageTitle';
import { PageDescription } from '../../PageDescription';
import cn from '@/app/_lib/utils/cn';
import AsideWrapper from './aside-wrapper';

export const PageWrapper = ({
	children,
	breadcrumbs = true,
	title = '',
	description = '',
	className = '',
	aside = null, // Pass aside content optionally
	isAside = true
}) => {
	const [isAsideVisible, setAsideVisible] = useState(isAside);

	return (
		<>
			<AppShell.Main className='flex flex-col min-h-screen justify-between'>
				<div className='flex flex-col justify-between md:flex-row w-full h-full'>
					<div className={cn('w-full px-4 pt-2 pb-4', breadcrumbs && 'pt-4', className)}>
						{/* Breadcrumbs */}
						{breadcrumbs && <AppBreadcrumbs />}

						{/* Page title */}
						{title && <PageTitle>{title}</PageTitle>}

						{/* Page Description */}
						{description && <PageDescription>{description}</PageDescription>}

						{/* Page Content */}
						{children}
					</div>

					{/* Optional Aside */}
					{isAside && aside && (
						<AsideWrapper
							isAsideVisible={isAsideVisible}
							setAsideVisible={setAsideVisible}
							aside={aside}
						/>
					)}
				</div>

				{/* Footer - naturally at bottom */}
				<Box className='flex items-center justify-center p-4 border-t border-[var(--app-shell-border-color)]'>
					<Text
						size='sm'
						color='dimmed'
					>
						© {new Date().getFullYear()} Utified · Built with <span className='text-red-500'>&hearts;</span> and codes.
					</Text>
				</Box>
			</AppShell.Main>
		</>
	);
};


// export const PageWrapper = ({
// 	children,
// 	breadcrumbs = true,
// 	title = '',
// 	description = '',
// 	className = '',
// 	aside = null
// }) => {
// 	return (
// 		<AppShell.Main className='flex flex-col justify-between'>
// 			<div className={cn('w-full px-4 pt-2 pb-4', breadcrumbs && 'pt-4', className)}>
// 				{/* Breadcrumbs */}
// 				{breadcrumbs && <AppBreadcrumbs />}

// 				{/* Page title */}
// 				{title && <PageTitle>{title}</PageTitle>}

// 				{/* Page Description */}
// 				{description && <PageDescription>{description}</PageDescription>}

// 				{/* Page Content */}
// 				{children}
// 			</div>

// 			{/* Footer - naturally at bottom after content */}
// 			<Box className='flex items-center justify-center p-4 border-t border-[var(--app-shell-border-color)]'>
// 				<Text
// 					size='sm'
// 					color='dimmed'
// 				>
// 					© {new Date().getFullYear()} Utified — Built with <span className='text-red-500'>&hearts;</span> and codes.
// 				</Text>
// 			</Box>
// 		</AppShell.Main>
// 	);
// };

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
