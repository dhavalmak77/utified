'use client';

import { LuLayoutDashboard, LuSparkles, LuWrench, LuBrain, LuShieldCheck, LuCode, LuTerminal, LuMousePointerClick, LuSend } from 'react-icons/lu';
import { PageWrapper } from './_components/layout/page-wrapper';

export default function HomePage() {
	const tools = ['JSON Formatter', 'Base64 Encoder', 'Slug Generator', 'JWT Decoder', 'Color Picker', 'QR Code Maker', 'Text Diff Checker', 'Markdown Previewer'];

	const useCases = [
		{
			icon: (
				<LuSparkles
					className='text-indigo-500'
					size={28}
				/>
			),
			title: 'Smart Transformations',
			desc: 'Auto-detect content and provide accurate formatting or decoding.',
		},
		{
			icon: (
				<LuTerminal
					className='text-indigo-500'
					size={28}
				/>
			),
			title: 'Effortless Debugging',
			desc: 'Instantly parse Base64, JWTs, HTML entities, and more.',
		},
		{
			icon: (
				<LuMousePointerClick
					className='text-indigo-500'
					size={28}
				/>
			),
			title: 'Fast Developer Ops',
			desc: 'Grab ready-to-use code snippets for headers, curl, JSON templates.',
		},
	];

	return (
		<PageWrapper
			breadcrumbs={false}
			className='p-0'
		>
			<div className='bg-zinc-950 text-white p-0 m-0'>
				{/* Hero Section */}
				<section className='relative text-center px-6 pt-24 pb-32'>
					<div className='absolute inset-0 bg-gradient-radial from-indigo-600/10 via-transparent to-transparent blur-3xl z-0' />
					<div className='relative z-10 max-w-4xl mx-auto'>
						<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight leading-tight'>
							Developer Tools,
							<br />
							Reimagined.
						</h1>
						<p className='mt-6 text-xl text-gray-400'>Fast, elegant, focused tools built to elevate your flow — not distract it.</p>
						<div className='mt-8 flex justify-center gap-4'>
							<button className='bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full flex items-center gap-2'>
								Explore Tools <LuLayoutDashboard />
							</button>
							<button className='border border-zinc-700 hover:border-indigo-500 px-6 py-3 rounded-full text-gray-300'>Discover the Craft</button>
						</div>
					</div>
				</section>

				{/* Craft Section */}
				<section className='px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<h2 className='text-3xl font-bold mb-4'>More Than Just Tools</h2>
						<p className='text-gray-400 text-lg mb-6'>We believe good tools inspire good work. That’s why we obsess over detail, UX, and performance — so you can focus on what matters.</p>
						<ul className='space-y-4 text-gray-300'>
							<li className='flex items-center gap-3'>
								<LuWrench className='text-indigo-500' /> Tailored utilities, no filler
							</li>
							<li className='flex items-center gap-3'>
								<LuBrain className='text-indigo-500' /> Designed for modern devs
							</li>
							<li className='flex items-center gap-3'>
								<LuShieldCheck className='text-indigo-500' /> Private. Local. Yours.
							</li>
						</ul>
					</div>
					<div className='bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-green-400 font-mono text-sm'>
						<pre>{`// no login, no spam\n> encode('data')\n> beautify(json)`}</pre>
					</div>
				</section>

				{/* Tools Grid Section */}
				<section className='px-6 py-24 bg-zinc-900 text-center'>
					<h2 className='text-3xl font-bold mb-12'>50+ Pro Developer Utilities</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
						{tools.map((tool, idx) => (
							<div
								key={idx}
								className='bg-zinc-800 p-5 rounded-xl flex items-center justify-between group hover:bg-indigo-600 transition-all'
							>
								<div className='font-medium'>{tool}</div>
								<LuCode className='group-hover:rotate-6 group-hover:scale-110 transition' />
							</div>
						))}
					</div>
				</section>

				{/* Use Cases Section */}
				<section className='px-6 py-24 max-w-6xl mx-auto'>
					<h2 className='text-3xl font-bold mb-12 text-center'>Built for Your Flow</h2>
					<div className='grid md:grid-cols-3 gap-6'>
						{useCases.map((item, i) => (
							<div
								key={i}
								className='bg-zinc-800 p-6 rounded-xl hover:bg-zinc-700 transition'
							>
								<div className='mb-3'>{item.icon}</div>
								<h3 className='text-xl font-semibold mb-1'>{item.title}</h3>
								<p className='text-gray-400'>{item.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* Snippet Playground Section */}
				<section className='px-6 py-24 bg-zinc-950 border-y border-zinc-800'>
					<div className='max-w-5xl mx-auto text-center'>
						<h2 className='text-3xl font-semibold mb-6'>Playground Preview</h2>
						<p className='text-gray-400 mb-10'>Live code snippets you can test without leaving the page.</p>
						<div className='rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 p-6 text-left text-sm font-mono text-green-400'>
							<pre>{`// Try a simple transformation\nconst result = base64.encode('hello world');\nconsole.log(result);`}</pre>
						</div>
					</div>
				</section>

				{/* Suggest Tool Section */}
				<section className='px-6 py-24 bg-gradient-to-r from-zinc-950 to-zinc-900 text-center'>
					<div className='max-w-xl mx-auto'>
						<h2 className='text-3xl font-semibold mb-4'>Suggest a Tool</h2>
						<p className='text-gray-400 mb-6'>Got an idea? We’re listening.</p>
						<form className='space-y-4 text-left'>
							<input
								type='text'
								placeholder='Tool name'
								className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 outline-none'
							/>
							<textarea
								placeholder='What should it do?'
								rows='3'
								className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 outline-none'
							/>
							<button
								type='submit'
								className='bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2'
							>
								Send <LuSend size={16} />
							</button>
						</form>
					</div>
				</section>
			</div>
		</PageWrapper>
	);
}


