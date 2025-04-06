import { Modal, Button, Input, Group, Text, Divider, Box, Badge } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { LuArrowDown, LuArrowUp, LuX } from 'react-icons/lu';
import { useState } from 'react';
import { Code } from '@mantine/core';

export const SearchModal = ({ isOpen, setIsOpen }) => {
	const [search, setSearch] = useState('');

	return (
		<Modal
			opened={isOpen}
			onClose={() => setIsOpen(false)}
			withCloseButton={false}
			size='lg'
			pb={0}
		>
			<Input
				leftSection={<TbSearch />}
				placeholder='Search...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				rightSection={
					<div style={{ pointerEvents: 'all' }}>
						<Button
							variant='subtle'
							c='inherit'
							onClick={() => setIsOpen(false)}
							px={10}
						>
							<LuX size={16} />
						</Button>
					</div>
				}
			/>

			<Box
				position='center'
				mt='md'
				variant=''
				pb={0}
			>
				<Group
					h={200}
					justify='center'
					align='center'
					flex={1}
					flexColumn
				>
					<Badge
						color='violet'
						variant='light'
						radius='sm'
						size='md'
						style={{ fontWeight: 600 }}
						leftSection={<TbSearch size={14} />}
					>
						Search something!
					</Badge>
				</Group>
				<Divider />
				{/* <Group
					h={40}
					justify='space-between'
					align='center'
					flex={1}
					pt={8}
				>
					<Group
						h={40}
						justify='start'
						align='center'
						gap={6}
					>
						<Text size='xs'>Press</Text>
						<Code
							pt={4}
							color='blue.9'
							c='white'
						>
							Enter
						</Code>
						<Text size='xs'>to select</Text>
						<Code
							pt={4}
							color='blue.9'
							c='white'
						>
							Tab
						</Code>
						<Code
							pt={5}
							pb={5}
							color='blue.9'
							c='white'
						>
							<LuArrowUp size={14} />
						</Code>
						<Code
							pt={5}
							pb={5}
							color='blue.9'
							c='white'
						>
							<LuArrowDown size={14} />
						</Code>
						<Text size='xs'>to navigate</Text>
						<Code
							pt={4}
							color='blue.9'
							c='white'
						>
							Esc
						</Code>
						<Text size='xs'>to close</Text>
					</Group>
					<Group>
						<Code
							pt={4}
							color='pink.9'
							c='white'
						>
							Made with &hearts; SiteName
						</Code>
					</Group>
				</Group> */}
				<Group
					h={40}
					justify='space-between'
					align='center'
					flex={1}
					pt={8}
				>
					<Group
						h={40}
						justify='start'
						align='center'
						gap={6}
					>
						<Text size='xs'>Press</Text>
						<Code
							color='blue.9'
							c='white'
							px={6}
						>
							Enter
						</Code>
						<Text size='xs'>to select</Text>
						<Code
							color='blue.9'
							c='white'
							px={6}
						>
							Tab
						</Code>
						<Code
							color='blue.9'
							c='white'
							px={6}
						>
							<LuArrowUp size={14} />
						</Code>
						<Code
							color='blue.9'
							c='white'
							px={6}
						>
							<LuArrowDown size={14} />
						</Code>
						<Text size='xs'>to navigate</Text>
						<Code
							color='blue.9'
							c='white'
							px={6}
						>
							Esc
						</Code>
						<Text size='xs'>to close</Text>
					</Group>

					<Group>
						<Code
							color='pink.9'
							c='white'
							px={8}
						>
							Made with ❤️ Utified
						</Code>
					</Group>
				</Group>
			</Box>
		</Modal>
	);
};
