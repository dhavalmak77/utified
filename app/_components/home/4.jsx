'use client';

import React from 'react';
import { TbBrackets, TbShieldLock, TbTransform, TbTextRecognition, TbFingerprint, TbLockAccess, TbBinary, TbLetterCase } from 'react-icons/tb';

const categories = [
	{ label: 'JSON Tools', icon: TbBrackets },
	{ label: 'Encoders', icon: TbShieldLock },
	{ label: 'Converters', icon: TbTransform },
	{ label: 'Text Utilities', icon: TbTextRecognition },
	{ label: 'Password Tools', icon: TbFingerprint },
	{ label: 'Secrets', icon: TbLockAccess },
];

const featuredTools = [
	{ name: 'JSON Formatter', desc: 'Format & validate JSON instantly', icon: TbBrackets },
	{ name: 'Base64 Decoder', desc: 'Decode/Encode text in Base64', icon: TbBinary },
	{ name: 'Text Case Converter', desc: 'Convert text to UPPER/lower/Title', icon: TbLetterCase },
];

const testimonials = [
	{
		name: 'Priya B.',
		title: 'Frontend Dev',
		quote: 'These tools have saved me so much time. Everything is just one click away!',
	},
	{
		name: 'Ahmed K.',
		title: 'Fullstack Engineer',
		quote: 'I use the JSON tools and encoders daily. Fast and reliable.',
	},
	{
		name: 'Sophie L.',
		title: 'Indie Hacker',
		quote: 'Clean interface, simple experience. Exactly what developers need.',
	},
];

export default function Home4() {
	return (
		<>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white py-28 text-center'>
				<h1 className='text-5xl font-extrabold tracking-tight'>Your Everyday Developer Toolbox</h1>
				<p className='mt-4 text-lg text-white/80'>50+ hand-crafted tools for developers, all in one place. No clutter. Just results.</p>
				<div className='mt-8 flex justify-center gap-4'>
					<button className='bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition'>Explore Tools</button>
					<button className='border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition'>Suggest Tool</button>
				</div>
			</section>

			{/* Category Explorer */}
			<section className='py-16 bg-gray-50 dark:bg-[#111]'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-8 text-center'>Tool Categories</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
						{categories.map((item, i) => (
							<div
								key={i}
								className='p-5 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-xl transition group cursor-pointer text-center'
							>
								<item.icon
									className='mx-auto text-indigo-600 dark:text-indigo-400 mb-2'
									size={30}
								/>
								<div className='font-medium text-gray-800 dark:text-white'>{item.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Tools */}
			<section className='py-16'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-8 text-center'>Most Loved Tools</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
						{featuredTools.map((tool, i) => (
							<div
								key={i}
								className='p-6 bg-white dark:bg-zinc-900 rounded-xl hover:shadow-lg transition'
							>
								<tool.icon
									className='text-indigo-500 mb-2'
									size={26}
								/>
								<div className='text-lg font-semibold'>{tool.name}</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>{tool.desc}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Search Tools Prompt */}
			<section className='py-20 bg-gradient-to-r from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800'>
				<div className='max-w-xl mx-auto px-4 text-center'>
					<h2 className='text-2xl font-bold mb-4'>Find the tool you're looking for</h2>
					<input
						className='w-full px-6 py-4 text-lg rounded-xl border border-gray-300 dark:border-zinc-700 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-900'
						placeholder='Try: JSON Formatter, Base64, Password Generator...'
					/>
				</div>
			</section>

			{/* Testimonials */}
			<section className='py-20 bg-white dark:bg-zinc-900'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-10'>Loved by Developers ❤️</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						{testimonials.map((t, i) => (
							<div
								key={i}
								className='p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl shadow'
							>
								<div className='text-gray-700 dark:text-gray-300 italic mb-4'>“{t.quote}”</div>
								<div className='font-bold text-gray-900 dark:text-white'>{t.name}</div>
								<div className='text-sm text-gray-500 dark:text-gray-400'>{t.title}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Suggest a Tool */}
			<section className='py-20 bg-indigo-600 text-white text-center'>
				<h2 className='text-3xl font-bold'>Missing a tool?</h2>
				<p className='mt-2 text-white/80'>Let us know what you’d love to see next!</p>
				<form className='mt-6 flex justify-center max-w-md mx-auto gap-2'>
					<input
						className='flex-1 px-4 py-3 rounded-lg text-black'
						placeholder='Suggest a tool...'
					/>
					<button className='bg-white text-indigo-600 font-bold px-5 rounded-lg'>Submit</button>
				</form>
			</section>

			{/* Footer */}
			<footer className='bg-black/90 text-white py-10'>
				<div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div>
						<h4 className='font-semibold mb-3'>Web Dev Tools</h4>
						<p className='text-sm text-gray-400'>A powerful suite of open-source tools for developers. Free forever.</p>
					</div>
					<div>
						<h4 className='font-semibold mb-3'>Links</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<a
									href='/'
									className='hover:underline'
								>
									Home
								</a>
							</li>
							<li>
								<a
									href='/tools'
									className='hover:underline'
								>
									All Tools
								</a>
							</li>
							<li>
								<a
									href='/about'
									className='hover:underline'
								>
									About
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className='font-semibold mb-3'>Contact</h4>
						<p className='text-sm text-gray-400'>hi@webdevtools.dev</p>
					</div>
				</div>
			</footer>
		</>
	);
}
