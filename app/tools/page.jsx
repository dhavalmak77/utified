'use client';

import { useState } from 'react';
import { Badge, Card, Grid, Group, Input, Tabs, Text, Title } from '@mantine/core';
import { TbSearch, TbJson, TbPasswordFingerprint, TbFileTypeCsv } from 'react-icons/tb';
import { useDebouncedValue } from '@mantine/hooks';
import Link from 'next/link';
import { PageWrapper } from '../_components/layout/page-wrapper';

const toolData = [
	{
		name: 'JSON Formatter',
		description: 'Format and validate your JSON instantly.',
		href: '/tools/json-formatter',
		icon: <TbJson size={24} />,
		category: 'JSON',
		badge: 'Popular',
	},
	{
		name: 'Password Generator',
		description: 'Create secure random passwords.',
		href: '/tools/password-generator',
		icon: <TbPasswordFingerprint size={24} />,
		category: 'Security',
		badge: 'New',
	},
	{
		name: 'CSV to JSON',
		description: 'Convert CSV data to JSON format.',
		href: '/tools/csv-to-json',
		icon: <TbFileTypeCsv size={24} />,
		category: 'Data',
	},
	// Add more tools here...
];

const ToolCard = ({ name, description, href, icon, badge }) => (
	<Link href={href}>
		<Card
			shadow='sm'
			padding='lg'
			radius='md'
			withBorder
			className='hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer'
		>
			<Group
				justify='space-between'
				mb='sm'
			>
				<Group>
					{icon}
					<Text fw={500}>{name}</Text>
				</Group>
				{badge && <Badge color={badge === 'New' ? 'green' : 'blue'}>{badge}</Badge>}
			</Group>
			<Text
				size='sm'
				c='dimmed'
			>
				{description}
			</Text>
		</Card>
	</Link>
);

const ToolsPage = () => {
	const [activeTab, setActiveTab] = useState('all');
	const [search, setSearch] = useState('');
	const [debounced] = useDebouncedValue(search, 200);

	const filteredTools = toolData.filter((tool) => {
		const matchCategory = activeTab === 'all' || tool.category === activeTab;
		const matchSearch = tool.name.toLowerCase().includes(debounced.toLowerCase()) || tool.description.toLowerCase().includes(debounced.toLowerCase());
		return matchCategory && matchSearch;
	});

	return (
		<PageWrapper
			title='Developer Tools'
			description='Handy utilities for web developers — formatters, converters, encoders, and more.'
		>
			<div className=''>
				{/* <Title
					order={2}
					mb={4}
				>
					Developer Tools
				</Title>
				<Text
					c='dimmed'
					mb='lg'
				>
					Handy utilities for web developers — formatters, converters, encoders, and more.
				</Text> */}

				<Group
					justify='space-between'
					mb='md'
					wrap='wrap'
				>
					<Tabs
						value={activeTab}
						onChange={setActiveTab}
					>
						<Tabs.List>
							<Tabs.Tab value='all'>All</Tabs.Tab>
							<Tabs.Tab value='JSON'>JSON</Tabs.Tab>
							<Tabs.Tab value='Security'>Security</Tabs.Tab>
							<Tabs.Tab value='Data'>Data</Tabs.Tab>
						</Tabs.List>
					</Tabs>

					<Input
						placeholder='Search tools...'
						leftSection={<TbSearch size={16} />}
						value={search}
						onChange={(event) => setSearch(event.currentTarget.value)}
						className='w-full sm:w-[250px]'
					/>
				</Group>

				<Grid>
					{filteredTools.map((tool, index) => (
						<Grid.Col
							key={index}
							span={{ base: 12, sm: 6, md: 4 }}
						>
							<ToolCard {...tool} />
						</Grid.Col>
					))}
				</Grid>
			</div>
		</PageWrapper>
	);
};

export default ToolsPage;
