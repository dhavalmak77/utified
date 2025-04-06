'use client';
import { LuHammer, LuSparkles, LuClock3, LuThumbsUp, LuUsers, LuCode, LuSend, LuArrowRight } from 'react-icons/lu';

export default function Home7() {
	return (
		<div className='bg-zinc-950 text-white font-sans'>
			{/* Hero */}
			<section className='min-h-screen flex items-center justify-center px-6 py-24 text-center'>
				<div className='max-w-4xl'>
					<h1 className='text-5xl font-bold tracking-tight mb-6 leading-tight'>
						Build. Convert. Format. <br />
						<span className='text-indigo-500'>Web Dev Tools</span> — All in One Place.
					</h1>
					<p className='text-gray-400 mb-8 text-lg'>A premium toolkit crafted for developers. Format JSON, encode text, convert files, generate secrets & more.</p>
					<div className='flex justify-center gap-4'>
						<button className='bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full text-white font-medium flex items-center gap-2'>
							Explore Tools <LuArrowRight size={18} />
						</button>
						<button className='border border-gray-700 hover:border-indigo-500 transition px-6 py-3 rounded-full text-gray-300 font-medium'>Suggest Tool</button>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className='px-6 py-20 bg-zinc-900'>
				<div className='max-w-5xl mx-auto text-center'>
					<h2 className='text-3xl font-semibold mb-12'>Why Developers Love It</h2>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
						{[
							{
								title: 'Fast & Reliable',
								icon: (
									<LuClock3
										className='text-indigo-500'
										size={32}
									/>
								),
								desc: 'Lightning-speed performance with zero delay.',
							},
							{
								title: 'Modern UI/UX',
								icon: (
									<LuSparkles
										className='text-indigo-500'
										size={32}
									/>
								),
								desc: 'Designed for focus and minimal distraction.',
							},
							{
								title: 'No Ads, No Noise',
								icon: (
									<LuThumbsUp
										className='text-indigo-500'
										size={32}
									/>
								),
								desc: 'Just tools, beautifully simple and clutter-free.',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-zinc-800 rounded-xl p-6 hover:bg-zinc-700 transition shadow-md'
							>
								<div className='mb-4'>{item.icon}</div>
								<h3 className='text-xl font-medium mb-2'>{item.title}</h3>
								<p className='text-gray-400 text-sm'>{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Tools Section */}
			<section className='px-6 py-20 bg-gradient-to-br from-zinc-900 to-zinc-800'>
				<div className='max-w-6xl mx-auto'>
					<h2 className='text-3xl font-semibold text-center mb-12'>Popular Tools</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
						{['JSON Formatter', 'Base64 Converter', 'Password Generator', 'URL Encoder', 'CSV to JSON', 'HTML Decoder'].map((tool, idx) => (
							<div
								key={idx}
								className='p-5 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-indigo-500 transition shadow-sm'
							>
								<div className='flex items-center gap-3 text-lg font-medium mb-2'>
									<LuHammer
										size={20}
										className='text-indigo-400'
									/>
									{tool}
								</div>
								<p className='text-sm text-gray-400'>Instant access to your favorite developer utility.</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Developer Trust */}
			<section className='px-6 py-20 bg-zinc-900 text-center'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-3xl font-semibold mb-4'>Built for Developers</h2>
					<p className='text-gray-400 mb-10'>Trusted by professionals, indie hackers, and full-stack engineers around the world.</p>
					<div className='flex flex-wrap justify-center gap-12 text-left'>
						<div>
							<h3 className='text-4xl font-bold'>50+</h3>
							<p className='text-gray-400'>Handy Tools</p>
						</div>
						<div>
							<h3 className='text-4xl font-bold'>30K+</h3>
							<p className='text-gray-400'>Monthly Users</p>
						</div>
						<div>
							<h3 className='text-4xl font-bold'>100%</h3>
							<p className='text-gray-400'>Open & Free</p>
						</div>
					</div>
				</div>
			</section>

			{/* Suggest Tool */}
			<section className='px-6 py-20 bg-zinc-950'>
				<div className='max-w-xl mx-auto text-center'>
					<h2 className='text-3xl font-semibold mb-4'>Suggest a Tool</h2>
					<p className='text-gray-400 mb-6'>Have a tool idea? We'd love to hear from you.</p>
					<form className='space-y-4 text-left'>
						<input
							type='text'
							placeholder='Your name'
							className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 focus:outline-none'
						/>
						<input
							type='text'
							placeholder='Tool name or feature'
							className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 focus:outline-none'
						/>
						<textarea
							placeholder='Short description or use case'
							rows='3'
							className='w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-indigo-500 focus:outline-none'
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
			<footer className='py-6 text-center text-sm text-gray-500 border-t border-zinc-800'>© {new Date().getFullYear()} Web Dev Tools. Crafted for developers with 💙</footer>
		</div>
	);
}
