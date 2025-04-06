'use client';

import { Textarea } from '@mantine/core';

export const CommonCard = () => {
	return (
		<div className="h-[400px] w-full bg-slate-200 border border-black flex rounded-md divide-x divide-black">
			{/* First column */}
			<div className="p-4 rounded-md rounded-r-none flex-1">
				<Textarea label="Input" description="Enter text to convert" error="" size="md" rows={6} placeholder='Write text or upload a file' />
			</div>

			{/* Second column */}
			<div className="p-4 rounded-md rounded-r-none flex-1">
				<Textarea label="Output" description="Converted text will appear here" error="" size="md" rows={6} placeholder='Converted text will appear here' />
			</div>
		</div>
	);
};