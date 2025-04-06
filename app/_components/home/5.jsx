'use client';

import { Container, Title, Text, Button, SimpleGrid, Card, Group, Avatar, Input, TextInput, Textarea } from '@mantine/core';
import { TbTool, TbSearch, TbStar, TbArrowNarrowRight } from 'react-icons/tb';

const tools = [
	{ name: 'JSON Formatter', icon: <TbTool size={24} />, description: 'Format and beautify your JSON data easily.' },
	{ name: 'Base64 Encoder', icon: <TbTool size={24} />, description: 'Convert text to/from Base64.' },
	{ name: 'Password Generator', icon: <TbTool size={24} />, description: 'Generate strong passwords on the fly.' },
];

const categories = [
	{ name: 'JSON Tools', icon: <TbTool size={20} /> },
	{ name: 'Text Utilities', icon: <TbTool size={20} /> },
	{ name: 'Security Tools', icon: <TbTool size={20} /> },
	{ name: 'Converters', icon: <TbTool size={20} /> },
];

const testimonials = [
	{
		name: 'Sarah Techie',
		role: 'Full-stack Dev',
		quote: 'This site is my daily go-to for all dev tools. Fast, minimal, and practical!',
		avatar: 'https://i.pravatar.cc/40?img=11',
	},
	{
		name: 'Mike Codes',
		role: 'Frontend Lead',
		quote: 'The password generator and JSON validator save me so much time!',
		avatar: 'https://i.pravatar.cc/40?img=22',
	},
];

export default function Home5() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
			{/* Hero */}
			<section className='py-24'>
				<Container
					size='lg'
					className='text-center'
				>
					<Title
						order={1}
						className='text-4xl md:text-6xl font-bold mb-4'
					>
						Web Dev Tools – Made for Developers
					</Title>
					<Text
						size='lg'
						className='mb-6 text-slate-300'
					>
						Explore powerful, free, and elegant tools to speed up your workflow.
					</Text>
					<Group position='center'>
						<TextInput
							placeholder='Search for a tool...'
							radius='md'
							size='md'
							icon={<TbSearch />}
							className='w-full max-w-md'
						/>
						<Button
							size='md'
							variant='gradient'
							gradient={{ from: 'cyan', to: 'blue' }}
						>
							Search
						</Button>
					</Group>
				</Container>
			</section>

			{/* Categories */}
			<section className='py-16 bg-slate-800 bg-opacity-40 backdrop-blur'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-2xl mb-6'
					>
						Tool Categories
					</Title>
					<SimpleGrid
						cols={{ base: 2, sm: 4 }}
						spacing='md'
					>
						{categories.map((cat, index) => (
							<Card
								key={index}
								radius='md'
								className='bg-slate-700/70 hover:bg-slate-700 transition-all'
							>
								<Group>
									{cat.icon}
									<Text>{cat.name}</Text>
								</Group>
							</Card>
						))}
					</SimpleGrid>
				</Container>
			</section>

			{/* Featured Tools */}
			<section className='py-16'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-2xl mb-6'
					>
						Trending Tools
					</Title>
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 3 }}
						spacing='lg'
					>
						{tools.map((tool, index) => (
							<Card
								key={index}
								shadow='md'
								radius='lg'
								className='bg-slate-800/80 hover:scale-[1.02] transition-all'
							>
								<Group mb='xs'>
									{tool.icon}
									<Text weight={500}>{tool.name}</Text>
								</Group>
								<Text
									size='sm'
									color='dimmed'
								>
									{tool.description}
								</Text>
							</Card>
						))}
					</SimpleGrid>
				</Container>
			</section>

			{/* Testimonials */}
			<section className='py-16 bg-slate-800 bg-opacity-40 backdrop-blur'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-2xl mb-6'
					>
						What Developers Say
					</Title>
					<SimpleGrid
						cols={{ base: 1, sm: 2 }}
						spacing='md'
					>
						{testimonials.map((t, i) => (
							<Card
								key={i}
								radius='md'
								className='bg-slate-700/70'
							>
								<Group mb='sm'>
									<Avatar
										src={t.avatar}
										radius='xl'
									/>
									<div>
										<Text>{t.name}</Text>
										<Text
											size='xs'
											color='dimmed'
										>
											{t.role}
										</Text>
									</div>
								</Group>
								<Text
									italic
									color='gray.3'
								>
									"{t.quote}"
								</Text>
							</Card>
						))}
					</SimpleGrid>
				</Container>
			</section>

			{/* Suggest a Tool */}
			<section className='py-16'>
				<Container size='lg'>
					<Title
						order={2}
						className='text-2xl mb-4'
					>
						Suggest a Tool
					</Title>
					<form className='space-y-4'>
						<TextInput
							placeholder='Your name'
							required
						/>
						<TextInput
							placeholder='Tool name or idea'
							required
						/>
						<Textarea
							placeholder='Description or use case'
							minRows={3}
						/>
						<Button
							type='submit'
							variant='light'
							rightSection={<TbArrowNarrowRight />}
						>
							Submit Suggestion
						</Button>
					</form>
				</Container>
			</section>

			{/* Footer */}
			<footer className='py-8 border-t border-slate-700 text-center text-slate-400 text-sm'>Built with ❤️ for developers. © {new Date().getFullYear()} Web Dev Tools.</footer>
		</div>
	);
}
