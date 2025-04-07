const findBreadcrumbPath = (navItems, path, breadcrumb = []) => {
	for (const item of navItems) {
		if (item.href === path) {
			return [...breadcrumb, { ...(item.href && ({ path: item.href })), title: item.label.props.children }];
		}
		if (item.children) {
			const result = findBreadcrumbPath(item.children, path, [...breadcrumb, { ...(item.href && ({ path: item.href })), title: item.label }]);
			if (result.length) {
				return result;
			}
		}
	}
	return [];
};

export const breadcrumbPath = (navItems, path) => {
	const breadcrumb = findBreadcrumbPath(navItems, path);
	const home = {
		path: '/',
		title: 'Home'
	}

	return [home, ...breadcrumb];
}