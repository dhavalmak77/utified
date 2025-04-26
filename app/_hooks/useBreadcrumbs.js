'use client';

import { usePathname } from 'next/navigation';
import { flattenNavTree } from '@/app/_lib/utils/navigation';
import { SIDER_NAVIGATION } from '../_components/layout/sidebar-left/SidebarNavigation';

export function useUtBreadcrumbs() {
	const pathname = usePathname(); // e.g. /tools/text/case-converter
	const navMap = flattenNavTree(SIDER_NAVIGATION);
	const trail = navMap[pathname];
	return trail?.filter((item) => item.label !== 'Home') || [];
}
