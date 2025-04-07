export function flattenNavTree(items, parentTrail = []) {
	const pathMap = {};

	for (const item of items) {
		const newTrail = [...parentTrail, item];

		if (item.href) {
			pathMap[item.href] = newTrail;
		}

		if (item.children) {
			Object.assign(pathMap, flattenNavTree(item.children, newTrail));
		}
	}

	return pathMap;
}