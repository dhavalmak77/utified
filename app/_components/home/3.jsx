'use client';

import React from 'react';
import { Button, Card, Center, Container, Grid, Group, Text, Title, useMantineTheme, Badge, Avatar } from '@mantine/core';
import { TbTools, TbJson, TbPasswordFingerprint, TbFileTypeCsv, TbArrowRight, TbUserStar, TbMoonStars, TbBulb } from 'react-icons/tb';
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

const testimonials = [
	{
		name: 'Alex Rivera',
		text: 'Absolutely love the simplicity and speed. Saved me hours on repetitive tasks.',
		avatar: 'https://i.pravatar.cc/80?img=12',
	},
	{
		name: 'Priya S.',
		text: 'A sleek toolbox for everyday dev work. JSON tools are top-notch.',
		avatar: 'https://i.pravatar.cc/80?img=47',
	},
];

const Home3 = () => {
	const theme = useMantineTheme();

	return (
		<div className='bg-gradient-to-br from-[#f9fafb] to-[#f1f5f9] min-h-screen text-gray-800'>
			{/* Hero Section */}
			<section className='py-24 px-4 text-center relative overflow-hidden'>
				<div className='absolute top-0 left-0 w-full h-full opacity-5'>
					<TbMoonStars className='w-full h-full' />
				</div>
				<Container size='lg'>
					<div className='max-w-3xl mx-auto relative z-10'>
						<Title
							order={1}
							className='text-4xl sm:text-5xl font-bold mb-4'
						>
							<TbTools className='inline mr-2' /> Web Dev Tools
						</Title>
						<Text
							size='lg'
							c='dimmed'
							className='mb-6'
						>
							Empowering developers with beautifully crafted utilities — fast, reliable, and intuitive.
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
							<TbBulb size={22} />
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
										className='hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer'
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

			{/* Testimonials Section */}
			<section className='bg-white py-16 px-4 border-t'>
				<Container size='lg'>
					<Center mb='xl'>
						<Group spacing='xs'>
							<TbUserStar size={22} />
							<Title order={2}>What Developers Say</Title>
						</Group>
					</Center>
					<Grid>
						{testimonials.map((t, i) => (
							<Grid.Col
								span={{ base: 12, md: 6 }}
								key={i}
							>
								<Card
									shadow='sm'
									padding='md'
									radius='md'
									withBorder
								>
									<Group>
										<Avatar
											src={t.avatar}
											radius='xl'
											size='lg'
										/>
										<div>
											<Text fw={600}>{t.name}</Text>
											<Text
												size='sm'
												c='dimmed'
											>
												{t.text}
											</Text>
										</div>
									</Group>
								</Card>
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</section>

			{/* CTA Section */}
			<section className='bg-slate-50 py-20 px-4 border-t border-gray-200'>
				<Container size='lg'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-8'>
						<div className='max-w-xl'>
							<Title
								order={3}
								className='text-2xl mb-2'
							>
								Have an idea for a tool?
							</Title>
							<Text
								size='sm'
								c='dimmed'
							>
								We’re constantly adding new tools. Got a suggestion or request? Let us know!
							</Text>
						</div>
						<Button
							size='md'
							variant='gradient'
							gradient={{ from: 'indigo', to: 'cyan' }}
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

export default Home3;
