import { useState, useCallback, useEffect } from 'react';

const initialCopyStatus = { isSuccess: false, hasError: false };

const useUtCopy = () => {
	const [copyStatus, setCopyStatus] = useState(initialCopyStatus);

	useEffect(() => {
		if (copyStatus.hasError || copyStatus.isSuccess) {
			const timeoutId = setTimeout(() => {
				setCopyStatus(initialCopyStatus);
			}, 2000);

			return () => clearTimeout(timeoutId);
		}
	}, [copyStatus]);

	const handleCopy = useCallback(
		async (textToCopy) => {
			try {
				await navigator.clipboard.writeText(textToCopy);
				setCopyStatus({ isSuccess: true, hasError: false });
			} catch (err) {
				console.error('Failed to copy text: ', err);
				setCopyStatus({ isSuccess: false, hasError: true });
			}
		},
		[]
	);

	return { copyStatus, handleCopy };
};

export default useUtCopy;
