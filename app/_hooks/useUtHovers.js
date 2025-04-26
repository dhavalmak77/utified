import { useState, useCallback, useMemo } from 'react';

export function useUtHovers(keys) {
	const [hovers, setHovers] = useState(() => Object.fromEntries(keys.map((key) => [key, false])));

	const handleHover = useCallback((key, value) => {
		setHovers((prev) => {
			if (prev[key] === value) return prev;
			return { ...prev, [key]: value };
		});
	}, []);

	const refs = useMemo(() => {
		return keys.reduce((acc, key) => {
			acc[key] = {
				onMouseEnter: () => handleHover(key, true),
				onMouseLeave: () => handleHover(key, false),
			};
			return acc;
		}, {});
	}, [keys, handleHover]);

	return { refs, hovers };
}

export default useUtHovers;