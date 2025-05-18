import { useState, useCallback, useEffect } from 'react';

const initialAutoSync = { input: false, output: false };
const initialSettings = { input: false, output: false };
const initialQrValues = { input: '', output: '' };
const initialShowQRCode = { input: false, output: false };
const initialError = { input: '', output: '' };

const initialProps = {
	inputValue: '',
	outputValue: '',
	autoSync: initialAutoSync,
	settings: initialSettings,
	qrValues: initialQrValues,
	showQRCode: initialShowQRCode,
	history: [],
	currentIndex: -1,
	loading: false,
	error: initialError,
};

export function useUtToolsHistory(props) {
	const mergedProps = { ...initialProps, ...props };

	const [inputValue, setInputValue] = useState(mergedProps.inputValue);
	const [outputValue, setOutputValue] = useState(mergedProps.outputValue);
	const [autoSync, setAutoSync] = useState(mergedProps.autoSync);
	const [settings, setSettings] = useState(mergedProps.settings);
	const [qrValues, setQrValues] = useState(mergedProps.qrValues);
	const [showQRCode, setShowQRCode] = useState(mergedProps.showQRCode);
	const [history, setHistory] = useState(mergedProps.history);
	const [currentIndex, setCurrentIndex] = useState(mergedProps.currentIndex);
	const [loading, setLoading] = useState(mergedProps.loading);
	const [error, setError] = useState(mergedProps.error);

	const addError = ({ type, message }) => {
		setError((prev) => ({ ...prev, [type]: message }));
	};

	const clearError = () => {
		setError(initialProps.error);
	};

	const clearValues = () => {
		setInputValue(initialProps.inputValue);
		setOutputValue(initialProps.outputValue);
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
	};

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
		clearError,
		clearValues
	};
}
