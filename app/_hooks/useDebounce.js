import { useRef } from 'react';

export function useDebounce() {
	const timeouts = useRef({});

	const debounce = (key, callback, delay = 500) => {
		if (timeouts.current[key]) {
			clearTimeout(timeouts.current[key]);
		}
		timeouts.current[key] = setTimeout(() => {
			callback();
			delete timeouts.current[key];
		}, delay);
	};

	return { debounce };
}

export default useDebounce;