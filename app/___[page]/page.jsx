import dynamic from 'next/dynamic';

const components = [
	dynamic(() => import('@/app/_components/home/1')),
	dynamic(() => import('@/app/_components/home/2')),
	dynamic(() => import('@/app/_components/home/3')),
	dynamic(() => import('@/app/_components/home/4')),
	dynamic(() => import('@/app/_components/home/5')),
	dynamic(() => import('@/app/_components/home/6')),
	dynamic(() => import('@/app/_components/home/7')),
	dynamic(() => import('@/app/_components/home/8')),
	dynamic(() => import('@/app/_components/home/9')),
	dynamic(() => import('@/app/_components/home/10')),
	dynamic(() => import('@/app/_components/home/11')),
	dynamic(() => import('@/app/_components/home/12')),
	dynamic(() => import('@/app/_components/home/13'))
];

export default async function Page({ params }) {
	// const index = parseInt(params.page, 14) - 1;
	const index = parseInt(params.page) - 1;

	if (isNaN(index) || index < 0 || index >= components.length) {
		return <div>Invalid page number</div>;
	}

    console.log('index', index);

	const DynamicComponent = components[index];
	return <DynamicComponent />;
}
