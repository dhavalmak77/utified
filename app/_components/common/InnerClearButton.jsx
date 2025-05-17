import { ActionIcon, Tooltip } from '@mantine/core';
import { LuX } from 'react-icons/lu';

export default function InnerClearButton({ value, onClick, label = 'Clear', size = 16 }) {
    if (!value) {
        return null;
    }

	return (
		<div className='flex items-start justify-end h-full pt-2 pr-2.5'>
			<Tooltip
				label={label}
				withArrow
			>
				<ActionIcon
					variant='subtle'
					color='gray'
					onClick={onClick}
					size='sm'
				>
					<LuX size={size} />
				</ActionIcon>
			</Tooltip>
		</div>
	);
}
