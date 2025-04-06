'use client';

import { Container, Title, Text, Button, Card, SimpleGrid, Group, Avatar, TextInput, Textarea } from '@mantine/core';
import { TbTool, TbSend, TbUsers, TbBolt, TbSparkles, TbCode } from 'react-icons/tb';

const features = [
	{ title: 'Instant Tools', icon: <TbBolt size={24} />, description: 'Lightning fast, no setup or signups.' },
	{ title: 'Modern UI', icon: <TbSparkles size={24} />, description: 'Sleek, minimal & responsive interfaces.' },
	{ title: '100% Free', icon: <TbUsers size={24} />, description: 'No subscriptions, always accessible.' },
];

const popularTools = [
	{ name: 'JSON Formatter', description: 'Format, beautify and validate your JSON.' },
	{ name: 'Base64 Encoder', description: 'Encode and decode Base64 text effortlessly.' },
	{ name: 'Password Generator', description: 'Generate secure, strong passwords instantly.' },
	{ name: 'CSV to JSON', description: 'Convert CSV files into structured JSON.' },
	{ name: 'URL Encoder', description: 'Encode and decode URLs with one click.' },
	{ name: 'HTML Entity Decoder', description: 'Decode and encode HTML entities quickly.' },
];

export default function Home6() {
	return (
		<div className='min-h-screen bg-slate-950 text-white font-sans'>
			{/* Hero */}
			<section className='py-24 text-center'>
				<Container size='lg'>
					<Title
						order={1}
						className='text-4xl md:text-6xl font-bold mb-4'
					>
						All-in-One Web Dev Tools
					</Title>
					<Text
						size='lg'
						className='max-w-xl mx-auto mb-6 text-slate-300'
					>
						Save hours every week with the smartest tools built for developers, creators, and engineers.
					</Text>
					<Group position='center'>
						<Button
							size='md'
							variant='gradient'
							gradient={{ from: 'blue', to: 'cyan' }}
						>
							Explore Tools
						</Button>
						<Button
							variant='default'
							color='gray'
						>
							Suggest a Tool
						</Button>
					</Group>
				</Container>
			</section>

			{/* Key Features */}
			<section className='py-20 bg-slate-900'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-3xl text-center mb-12'
					>
						Why Developers Love Us
					</Title>
					<SimpleGrid
						cols={{ base: 1, sm: 3 }}
						spacing='xl'
					>
						{features.map((feature, index) => (
							<Card
								key={index}
								className='bg-slate-800/80 text-center hover:bg-slate-800 transition'
							>
								<div className='mb-4 flex justify-center'>{feature.icon}</div>
								<Text className='text-xl font-semibold mb-2'>{feature.title}</Text>
								<Text
									size='sm'
									color='gray.4'
								>
									{feature.description}
								</Text>
							</Card>
						))}
					</SimpleGrid>
				</Container>
			</section>

			{/* Most Used Tools */}
			<section className='py-20 bg-gradient-to-br from-slate-900 to-slate-800'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-3xl text-center mb-12'
					>
						Top Tools Developers Use
					</Title>
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 3 }}
						spacing='lg'
					>
						{popularTools.map((tool, index) => (
							<Card
								key={index}
								className='bg-slate-800/80 hover:scale-105 transition-transform'
								withBorder
							>
								<Group mb='xs'>
									<TbTool size={20} />
									<Text weight={600}>{tool.name}</Text>
								</Group>
								<Text
									size='sm'
									color='gray.4'
								>
									{tool.description}
								</Text>
							</Card>
						))}
					</SimpleGrid>
				</Container>
			</section>

			{/* Developer Trust */}
			<section className='py-20 bg-slate-900'>
				<Container
					size='lg'
					className='text-center'
				>
					<Title
						order={2}
						className='text-3xl mb-4'
					>
						Built for Developers
					</Title>
					<Text
						size='lg'
						className='max-w-xl mx-auto mb-10 text-slate-400'
					>
						Web Dev Tools is designed with performance, clarity, and focus. Trusted by thousands of devs across the globe.
					</Text>
					<Group
						position='center'
						className='flex-wrap gap-6'
					>
						<div className='text-center'>
							<Title order={3}>50+</Title>
							<Text size='sm'>Tools & Utilities</Text>
						</div>
						<div className='text-center'>
							<Title order={3}>30K+</Title>
							<Text size='sm'>Monthly Users</Text>
						</div>
						<div className='text-center'>
							<Title order={3}>5★</Title>
							<Text size='sm'>Community Rated</Text>
						</div>
					</Group>
				</Container>
			</section>

			{/* Suggest a Tool */}
			<section className='py-20'>
				<Container size='sm'>
					<Title
						order={2}
						className='text-3xl text-center mb-6'
					>
						Got a Tool in Mind?
					</Title>
					<Text className='text-center mb-8 text-slate-400'>Help us grow by suggesting a new tool or feature.</Text>
					<form className='space-y-4'>
						<TextInput
							required
							placeholder='Your Name'
						/>
						<TextInput
							required
							placeholder='Tool Name / Feature'
						/>
						<Textarea
							placeholder='Short Description or Use Case'
							minRows={3}
						/>
						<Group position='right'>
							<Button
								type='submit'
								rightSection={<TbSend />}
							>
								Submit
							</Button>
						</Group>
					</form>
				</Container>
			</section>

			{/* Footer */}
			<footer className='py-8 border-t border-slate-800 text-center text-sm text-slate-500'>© {new Date().getFullYear()} Web Dev Tools. All rights reserved.</footer>
		</div>
	);
}
