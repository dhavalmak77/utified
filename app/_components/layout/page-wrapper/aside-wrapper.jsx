'use client';

import { Title, Tooltip, ActionIcon, Box } from '@mantine/core';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import clsx from 'clsx';
import cn from '@/app/_lib/utils/cn';

const AsideWrapper = ({ aside, isAsideVisible, setAsideVisible }) => {
	return (
		<Box className={cn('relative hidden md:flex flex-col border-l border-[var(--app-shell-border-color)] transition-all duration-250 ease-linear p-4', isAsideVisible ? 'w-[300px]' : 'w-[55px]')}>
			{/* Toggle Icon (Always top-right) */}
			<div className='relative'>
				{/* {isAsideVisible && ( */}
				{/* <Title
						order={2}
						size='h6'
						fw={500}
						className='mb-2'
						classNames="transition-all duration-250 ease-linear"
						hidden={!isAsideVisible}
					>
						Panel
					</Title> */}
				{/* )} */}

				<Title
					order={2}
					size='h6'
					fw={500}
					className={cn('transition-all duration-250 ease-linear overflow-hidden', isAsideVisible ? 'opacity-100 mb-2 max-h-[40px]' : 'opacity-0 mb-0 max-h-0')}
				>
					Panel
				</Title>

				<div className='absolute top-0 right-0'>
					{/* <Tooltip
						// label={isAsideVisible ? 'Collapse panel' : 'Expand panel'}
						// label={isAsideVisible ? 'Collapse panel' : 'Expand panel'}
						withArrow
						arrowSize={6}
						openDelay={500}
						position='left'
					> */}
						<ActionIcon
							variant='default'
							size='sm'
							aria-label='Toggle Aside'
							onClick={() => setAsideVisible(!isAsideVisible)}
						>
							{isAsideVisible ? <LuChevronRight size={16} /> : <LuChevronLeft size={16} />}
						</ActionIcon>
					{/* </Tooltip> */}
				</div>
			</div>

			{/* Dynamic Content */}
			<div className={clsx('transition-opacity duration-300 overflow-hidden', isAsideVisible ? 'opacity-100 mt-4' : 'opacity-0 h-0')}>{isAsideVisible && aside}</div>
		</Box>
	);
};

export default AsideWrapper;

// 'use client';

// import { Title, Tooltip, ActionIcon, Box } from '@mantine/core';
// import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
// import clsx from 'clsx';
// import cn from '@/app/_lib/utils/cn';

// const AsideWrapper = ({ aside, isAsideVisible, setAsideVisible }) => {
// 	return (
// 		<Box className={cn('relative hidden md:flex flex-col border-l border-[var(--app-shell-border-color)] transition-all duration-250 ease-linear p-4', isAsideVisible ? 'w-[300px] p-4' : 'w-[55px]')}>
// 			{/* Header with Toggle Icon */}
// 			<div className='flex items-center justify-between'>
// 				{isAsideVisible && (
// 					<Title
// 						order={2}
// 						size='h6'
// 						fw={500}
// 					>
// 						Panel
// 					</Title>
// 				)}

// 				<Tooltip
// 					label={isAsideVisible ? 'Collapse panel' : 'Expand panel'}
// 					withArrow
// 					arrowSize={6}
// 					openDelay={500}
// 					position='left'
// 				>
// 					<ActionIcon
// 						variant='default'
// 						size='sm'
// 						aria-label='Toggle Aside'
// 						onClick={() => setAsideVisible(!isAsideVisible)}
// 					>
// 						{isAsideVisible ? <LuChevronRight size={16} /> : <LuChevronLeft size={16} />}
// 					</ActionIcon>
// 				</Tooltip>
// 			</div>

// 			{/* Dynamic Content */}
// 			<div className={clsx('transition-opacity duration-300 overflow-hidden', isAsideVisible ? 'opacity-100 mt-4' : 'opacity-0 h-0')}>{isAsideVisible && aside}</div>
// 		</Box>
// 	);
// };

// export default AsideWrapper;
