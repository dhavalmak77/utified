import { Button, Group } from '@mantine/core';
import { AiOutlineUndo, AiOutlineRedo } from 'react-icons/ai';
import { useHover } from '@mantine/hooks';

export function UndoRedoButtons({ onUndo, onRedo, canUndo, canRedo }) {
	const { hovered: hoveredUndo, ref: refUndo } = useHover();
	const { hovered: hoveredRedo, ref: refRedo } = useHover();

	return (
		<>
			<Button
				variant={hoveredUndo ? 'filled' : 'default'}
				onClick={onUndo}
				leftSection={<AiOutlineUndo size={16} />}
				disabled={!canUndo}
				ref={refUndo}
			>
				Undo
			</Button>
			<Button
				variant={hoveredRedo ? 'filled' : 'default'}
				onClick={onRedo}
				leftSection={<AiOutlineRedo size={16} />}
				disabled={!canRedo}
				ref={refRedo}
			>
				Redo
			</Button>
		</>
	);
}
