'use client';

import { LuSparkles, LuBolt, LuGlobe, LuLayers, LuSend, LuTerminal, LuShieldCheck, LuArrowRight, LuCode } from 'react-icons/lu';

export default function Home8() {
	return (
		<main className='bg-zinc-950 text-white font-sans'>
			{/* Spotlight Intro */}
			<section className='min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-zinc-900 to-zinc-800'>
				<div className='max-w-5xl'>
					<h1 className='text-6xl font-extrabold leading-tight tracking-tight mb-4'>
						The Only <span className='text-indigo-500'>Toolbox</span> You’ll Ever Need
					</h1>
					<p className='text-gray-400 text-xl mb-8'>Web Dev Tools — 50+ handcrafted utilities for modern developers. No ads. No distractions. Just pure utility.</p>
					<div className='flex justify-center gap-4'>
						<button className='bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2'>
							Explore Tools <LuArrowRight size={18} />
						</button>
						<button className='border border-zinc-700 hover:border-indigo-500 transition px-6 py-3 rounded-full text-gray-300 font-semibold'>Why This Exists?</button>
					</div>
				</div>
			</section>

			{/* Split Grid Philosophy */}
			<section className='grid sm:grid-cols-2 gap-8 px-6 py-24 max-w-6xl mx-auto items-center'>
				<div>
					<h2 className='text-3xl font-bold mb-4'>Tools with Soul</h2>
					<p className='text-gray-400 text-lg'>Built with precision and love. We’re devs too. We built these tools for ourselves — and now they’re yours.</p>
					<ul className='mt-6 space-y-3 text-gray-300'>
						<li className='flex items-center gap-3'>
							<LuSparkles className='text-indigo-500' /> Clean, focused UI
						</li>
						<li className='flex items-center gap-3'>
							<LuBolt className='text-indigo-500' /> Fast, local-first performance
						</li>
						<li className='flex items-center gap-3'>
							<LuGlobe className='text-indigo-500' /> No data sent to server
						</li>
					</ul>
				</div>
				<div className='p-6 rounded-2xl bg-zinc-800 border border-zinc-700 shadow-xl'>
					<pre className='text-sm text-green-400 font-mono'>{`> web-dev-tools\n> Ready to transform your workflow`}</pre>
				</div>
			</section>

			{/* Tool Matrix */}
			<section className='px-6 py-24 bg-zinc-900'>
				<div className='max-w-6xl mx-auto text-center'>
					<h2 className='text-3xl font-bold mb-12'>Tool Matrix</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
						{['JSON Formatter', 'Base64 Converter', 'Password Generator', 'Text Case Changer', 'HTML Encoder', 'Markdown Viewer', 'JWT Decoder', 'Color Picker'].map((tool, idx) => (
							<div
								key={idx}
								className='bg-zinc-800 hover:bg-indigo-500 hover:text-white transition-all duration-300 p-4 rounded-xl flex items-center justify-between group'
							>
								<div className='font-medium'>{tool}</div>
								<LuCode className='opacity-50 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300' />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Dev Use Cases */}
			<section className='px-6 py-24 max-w-5xl mx-auto'>
				<h2 className='text-3xl font-bold mb-10 text-center'>Dev Workflows Simplified</h2>
				<div className='grid sm:grid-cols-2 gap-6'>
					{[
						{
							icon: (
								<LuLayers
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Data Formatting',
							desc: 'Beautify and validate JSON, XML, CSV effortlessly.',
						},
						{
							icon: (
								<LuTerminal
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Debugging',
							desc: 'Base64 decode, JWT inspection, HTML unescape and more.',
						},
						{
							icon: (
								<LuShieldCheck
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Secure Dev',
							desc: 'Generate strong passwords, one-time secrets, hashes.',
						},
						{
							icon: (
								<LuGlobe
									className='text-indigo-500'
									size={28}
								/>
							),
							title: 'Web Ready',
							desc: 'Encode URIs, convert headers, prep text for APIs.',
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

			{/* Suggest Tool CTA */}
			<section className='px-6 py-20 bg-gradient-to-br from-zinc-950 to-zinc-900 text-center'>
				<div className='max-w-xl mx-auto'>
					<h2 className='text-3xl font-semibold mb-4'>Suggest Your Own Tool</h2>
					<p className='text-gray-400 mb-6'>If you think something is missing — tell us. We’ll build it.</p>
					<form className='space-y-4 text-left'>
						<input
							type='text'
							placeholder='Tool idea'
							className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 outline-none'
						/>
						<textarea
							placeholder='How would it help?'
							rows='3'
							className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 outline-none'
						/>
						<button
							type='submit'
							className='bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2'
						>
							Submit Suggestion <LuSend size={16} />
						</button>
					</form>
				</div>
			</section>

			{/* Footer */}
			<footer className='py-6 text-center text-sm text-gray-500 border-t border-zinc-800'>© {new Date().getFullYear()} Web Dev Tools · Crafted for developers with 💙</footer>
		</main>
	);
}