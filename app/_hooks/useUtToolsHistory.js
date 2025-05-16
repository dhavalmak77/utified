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

export function useUtToolsHistory(props = initialProps) {
	const [inputValue, setInputValue] = useState(props.inputValue);
	const [outputValue, setOutputValue] = useState(props.outputValue);
	const [autoSync, setAutoSync] = useState(props.autoSync);
	const [settings, setSettings] = useState(props.settings);
	const [qrValues, setQrValues] = useState(props.qrValues);
	const [showQRCode, setShowQRCode] = useState(props.showQRCode);
	const [history, setHistory] = useState(props.history);
	const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
	const [loading, setLoading] = useState(props.loading);
	const [error, setError] = useState(props.error);

	const addError = ({ type, message }) => {
		setError((prev) => ({ ...prev, [type]: message }));
	};

	const clearError = () => {
		setError(initialError);
	};

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
		clearError
	};
}
