import { Input, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import { SearchModal } from './SearchModal';

export const SearchBar = ({ onFocus }) => {
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef(null);

	// Focus input on Ctrl+K or Cmd+K
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key.toLowerCase() === 'K') {
				event.preventDefault(); // prevent browser default (like bold in editors)
				inputRef.current?.focus();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			<Input
				onFocus={() => {
					setIsOpen(true);
					inputRef.current?.blur();
				}}
				ref={inputRef}
				placeholder='Search...'
				leftSection={<TbSearch />}
				rightSection={
					<Text
						size='xs'
						fw={500}
						c='black'
					>
						Ctrl + K
					</Text>
				}
				rightSectionWidth={60}
			/>
			<SearchModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
};
