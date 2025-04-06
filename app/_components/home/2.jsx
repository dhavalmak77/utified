'use client';

import { Button, Card, Center, Container, Grid, Group, Text, Title/*, useMantineTheme*/ } from '@mantine/core';
import { TbTools, TbJson, TbPasswordFingerprint, TbFileTypeCsv, TbArrowRight } from 'react-icons/tb';
import Link from 'next/link';

const featuredTools = [
	{
		title: 'JSON Formatter',
		icon: <TbJson size={28} />,
		href: '/tools/json-formatter',
		color: 'blue',
	},
	{
		title: 'Password Generator',
		icon: <TbPasswordFingerprint size={28} />,
		href: '/tools/password-generator',
		color: 'green',
	},
	{
		title: 'CSV to JSON',
		icon: <TbFileTypeCsv size={28} />,
		href: '/tools/csv-to-json',
		color: 'violet',
	},
];

export const Home2 = () => {
	// const theme = useMantineTheme();

	return (
		<div className='bg-gradient-to-br from-[#f9fafb] to-[#f1f5f9] min-h-screen text-gray-800'>
			{/* Hero Section */}
			<section className='py-24 px-4 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-slate-100'>
				<Container size='lg'>
					<div className='max-w-3xl mx-auto'>
						<Title
							order={1}
							className='text-4xl sm:text-5xl font-bold mb-4'
						>
							⚡ Web Dev Tools
						</Title>
						<Text
							size='lg'
							c='dimmed'
							className='mb-6'
						>
							A suite of powerful developer tools – formatters, encoders, converters, and generators — built for speed and simplicity.
						</Text>
						<Group justify='center'>
							<Link href='/tools'>
								<Button
									size='md'
									radius='xl'
									rightSection={<TbArrowRight />}
								>
									Explore Tools
								</Button>
							</Link>
							<Button
								size='md'
								variant='default'
								radius='xl'
							>
								GitHub
							</Button>
						</Group>
					</div>
				</Container>
			</section>

			{/* Featured Tools Section */}
			<section className='py-16 px-4'>
				<Container size='lg'>
					<Center mb='xl'>
						<Group spacing='xs'>
							<TbTools size={22} />
							<Title order={2}>Featured Tools</Title>
						</Group>
					</Center>
					<Grid>
						{featuredTools.map((tool, i) => (
							<Grid.Col
								span={{ base: 12, sm: 6, md: 4 }}
								key={i}
							>
								<Link href={tool.href}>
									<Card
										shadow='md'
										radius='md'
										withBorder
										className='hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer'
									>
										<Group>
											<div className={`text-${tool.color}-600 bg-${tool.color}-100 rounded-full p-2`}>{tool.icon}</div>
											<Text fw={500}>{tool.title}</Text>
										</Group>
									</Card>
								</Link>
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</section>

			{/* Split CTA Section */}
			<section className='bg-white py-20 px-4 border-t'>
				<Container size='lg'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-8'>
						<div className='max-w-xl'>
							<Title
								order={3}
								className='text-2xl mb-2'
							>
								Got a tool idea?
							</Title>
							<Text
								size='sm'
								c='dimmed'
							>
								We're building a toolkit *by developers, for developers*. Share your idea and we’ll bring it to life!
							</Text>
						</div>
						<Button
							size='md'
							variant='light'
							radius='xl'
						>
							Request a Tool
						</Button>
					</div>
				</Container>
			</section>
		</div>
	);
};

export default Home2;