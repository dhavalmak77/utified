'use client';

import { LuSparkles, LuWrench, LuSend, LuBrain, LuTerminal, LuLayoutGrid, LuMousePointerClick, LuGlobe, LuCode } from 'react-icons/lu';

export default function Home9() {
	return (
		<main className='bg-zinc-950 text-white font-sans overflow-x-hidden'>
			{/* 🌌 Hero Section */}
			<section className='min-h-screen relative flex flex-col justify-center items-center text-center px-6 pt-20 pb-32 bg-zinc-950'>
				<div className='absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent blur-2xl pointer-events-none' />
				<h1 className='text-5xl md:text-7xl font-extrabold mb-6 tracking-tight z-10'>
					Build Smarter.
					<br />
					Work Faster.
				</h1>
				<p className='text-lg md:text-xl text-gray-400 max-w-2xl z-10'>A beautifully crafted set of developer tools — fast, offline-ready, distraction-free.</p>
				<div className='flex gap-4 mt-8 z-10'>
					<button className='px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-medium flex items-center gap-2'>
						Explore Tools <LuLayoutGrid />
					</button>
					<button className='px-6 py-3 rounded-full border border-zinc-700 text-gray-300 hover:border-indigo-500'>Why We Built This</button>
				</div>
			</section>

			{/* ✍️ Story + Craft */}
			<section className='max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center'>
				<div>
					<h2 className='text-3xl font-bold mb-4'>Crafted for Developers</h2>
					<p className='text-gray-400 text-lg'>
						We’re developers too. We wanted fast, useful tools without fluff — so we built Web Dev Tools.
						<br />
						<br />
						No ads. No distractions. Just performance and elegance.
					</p>
					<ul className='mt-6 space-y-3 text-gray-300'>
						<li className='flex items-center gap-3'>
							<LuWrench className='text-indigo-500' /> 50+ finely tuned utilities
						</li>
						<li className='flex items-center gap-3'>
							<LuBrain className='text-indigo-500' /> Built with dev-first logic
						</li>
						<li className='flex items-center gap-3'>
							<LuGlobe className='text-indigo-500' /> Privacy-first, runs on device
						</li>
					</ul>
				</div>
				<div className='p-6 rounded-2xl bg-zinc-900 shadow-2xl border border-zinc-800'>
					<code className='block text-green-400 text-md font-mono'>{`> npm run toolbox\n> Developer flow unlocked.`}</code>
				</div>
			</section>

			{/* 🧊 Tool Matrix */}
			<section className='px-6 py-24 bg-zinc-900'>
				<div className='max-w-6xl mx-auto text-center'>
					<h2 className='text-3xl font-bold mb-12'>Tools That Just Work</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
						{['JSON Formatter', 'Base64 Encode', 'Password Generator', 'Text Case Changer', 'JWT Decoder', 'Color Picker', 'URL Encoder', 'HTML Minifier'].map((tool, idx) => (
							<div
								key={idx}
								className='bg-zinc-800 hover:bg-indigo-500 hover:text-white transition-all duration-300 p-5 rounded-xl flex items-center justify-between group backdrop-blur'
							>
								<div className='font-medium'>{tool}</div>
								<LuCode className='opacity-50 group-hover:rotate-6 group-hover:scale-110 transition-transform' />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 🧠 Dev Workflow Panels */}
			<section className='px-6 py-24 max-w-6xl mx-auto'>
				<h2 className='text-3xl font-bold mb-12 text-center'>Use Cases That Matter</h2>
				<div className='grid md:grid-cols-3 gap-6'>
					{[
						{
							icon: (
								<LuTerminal
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Debugging & Decoding',
							desc: 'Decode JWTs, inspect Base64 or escape HTML safely.',
						},
						{
							icon: (
								<LuSparkles
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Beautify Everything',
							desc: 'Format and clean JSON, XML, SQL with one click.',
						},
						{
							icon: (
								<LuMousePointerClick
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Fast Dev Touches',
							desc: 'Generate colors, secure passwords, slugs, headers.',
						},
					].map((item, i) => (
						<div
							key={i}
							className='bg-zinc-800 p-6 rounded-xl shadow hover:bg-zinc-700 transition'
						>
							<div className='mb-3'>{item.icon}</div>
							<h3 className='text-xl font-semibold mb-1'>{item.title}</h3>
							<p className='text-gray-400'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* 💡 Suggest a Tool */}
			<section className='px-6 py-24 bg-gradient-to-tr from-zinc-950 to-zinc-900 text-center'>
				<div className='max-w-xl mx-auto'>
					<h2 className='text-3xl font-semibold mb-4'>Suggest a New Tool</h2>
					<p className='text-gray-400 mb-6'>Have an idea? Let us know and we might build it next.</p>
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
							Send Suggestion <LuSend size={16} />
						</button>
					</form>
				</div>
			</section>

			{/* 🖤 Footer */}
			<footer className='py-6 text-center text-sm text-gray-500 border-t border-zinc-800'>© {new Date().getFullYear()} Web Dev Tools · Built with care and code.</footer>
		</main>
	);
}
