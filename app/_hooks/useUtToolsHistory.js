import { useState, useCallback, useEffect } from 'react';

const initialError = { input: '', output: '' };

export function useUtToolsHistory(initialInput = '', initialOutput = '') {
	const [inputValue, setInputValue] = useState(initialInput);
	const [outputValue, setOutputValue] = useState(initialOutput);
	const [autoSync, setAutoSync] = useState({ input: false, output: false });
	const [settings, setSettings] = useState({ input: false, output: false });
	const [qrValues, setQrValues] = useState({ input: '', output: '' });
	const [showQRCode, setShowQRCode] = useState({ input: false, output: false });
	const [history, setHistory] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialError);

	const addError = ({ type, message }) => {
		setError((prev) => ({ ...prev, [type]: message }));
	};

	const clearError = () => {
		setError(initialError);
	}

	useEffect(() => {
		if (showQRCode.input || showQRCode.output) {
			const qrCodeId = setTimeout(() => {
				setQrValues({ input: inputValue, output: outputValue });
			}, 750);

			return () => clearTimeout(qrCodeId);
		}
	}, [inputValue, outputValue, showQRCode]);

	const toggleSettings = (type) => {
		setSettings((prev) => ({ ...prev, [type]: !prev[type] }));
	};

	const toggleAutoSync = (type) => {
		setAutoSync((prev) => ({ ...prev, [type]: !prev[type] }));
	}

	const toggleQRCode = (type) => {
		setShowQRCode((prev) => ({ ...prev, [type]: !prev[type] }));
	};

	const addToHistory = useCallback(
		(newInput, newOutput) => {
			setHistory((prev) => {
				const last = prev[currentIndex];
				if (last && last.inputValue === newInput && last.outputValue === newOutput) {
					return prev;
				}
				const updated = [...prev.slice(0, currentIndex + 1), { inputValue: newInput, outputValue: newOutput }];
				setCurrentIndex(updated.length - 1);
				return updated;
			});
		},
		[currentIndex]
	);

	const undo = useCallback(() => {
		setCurrentIndex((prev) => {
			if (prev > 0) {
				const newIndex = prev - 1;
				setInputValue(history[newIndex].inputValue);
				setOutputValue(history[newIndex].outputValue);
				return newIndex;
			}
			return prev;
		});
	}, [history, currentIndex]);

	const redo = useCallback(() => {
		setCurrentIndex((prev) => {
			if (prev < history.length - 1) {
				const newIndex = prev + 1;
				setInputValue(history[newIndex].inputValue);
				setOutputValue(history[newIndex].outputValue);
				return newIndex;
			}
			return prev;
		});
	}, [history]);

	return {
		inputValue,
		setInputValue,
		outputValue,
		setOutputValue,
		settings,
		toggleSettings,
		autoSync,
		toggleAutoSync,
		qrValues,
		setQrValues,
		showQRCode,
		toggleQRCode,
		loading,
		setLoading,
		addToHistory,
		undo,
		redo,
		canUndo: currentIndex > 0,
		canRedo: currentIndex < history.length - 1,
		error,
		addError,
		clearError
	};
}
