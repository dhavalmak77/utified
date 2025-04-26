const [encodeInput, setEncodeInput] = useState('');
const [decodeInput, setDecodeInput] = useState('');
const [history, setHistory] = useState([]);
const [currentIndex, setCurrentIndex] = useState(-1);

const handleRedo = () => {
	if (currentIndex < history.length - 1) {
		const nextState = history[currentIndex + 1];
		setEncodeInput(nextState.jsonInput);
		setDecodeInput(nextState.objectOutput);
		setCurrentIndex(currentIndex + 1);
	}
};

const handleUndo = () => {
	if (currentIndex > 0) {
		const prevState = history[currentIndex - 1];
		setEncodeInput(prevState.jsonInput);
		setDecodeInput(prevState.objectOutput);
		setCurrentIndex(currentIndex - 1);
	}
};

const addToHistory = useCallback(
	(newState) => {
		setHistory((prevHistory) => {
			const updatedHistory = [...prevHistory.slice(0, currentIndex + 1), newState];
			setCurrentIndex(updatedHistory.length - 1);
			return updatedHistory;
		});
		setCurrentIndex(updatedHistory.length - 1);
	},
	[history, currentIndex]
);