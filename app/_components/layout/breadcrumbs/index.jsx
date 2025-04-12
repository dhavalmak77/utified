// import { Breadcrumbs, Anchor } from '@mantine/core';
// import { usePathname } from 'next/navigation';

// const items = [
// 	{ title: 'Mantine', href: '#' },
// 	{ title: 'Mantine hooks', href: '#' },
// 	{ title: 'use-id', href: '#' },
// ].map((item, index) => (
// 	<Anchor href={item.href} key={index}>
// 		{item.title}
// 	</Anchor>
// ));

// const AppBreadcrumbs = () => {
// 	const pathname = usePathname();

// 	if (pathname === '/') {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Breadcrumbs separator="/" separatorMargin="xs">{items}</Breadcrumbs>
// 		</>
// 	);
// }

// export default AppBreadcrumbs;


// components/AppBreadcrumbs.js

'use client';
import Link from 'next/link';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import { useBreadcrumbs } from '@/app/_hooks/useBreadcrumbs';
import styled from 'styled-components';

const BlueLink = styled.a`
	color: #228be6;

	&:hover {
		text-decoration: underline;
	}
`;

export default function AppBreadcrumbs() {
	let items = useBreadcrumbs();

	if (!items.length) return null;

	items = [{ label: 'Home', href: '/' }, ...items].map((item, index) => {
		const Format = item?.href ? Link : Text;

		return (
			<Format
				href={item.href ?? '#'}
				key={index}
				color={item?.href ? 'blue' : 'dimmed'}
				// color='blue'
				// opacity={item?.href ? 1 : 0.8}
			>
				{item.label}
				{/* {item?.href && <BlueLink>{item.label}</BlueLink>}
				{!item?.href && item.label} */}
			</Format>
		);
	})

	console.log("ITEMS", items);

	return (
		<Breadcrumbs
			separator='/'
			separatorMargin='xs'
		>
			{items}
		</Breadcrumbs>
	);

	return (
		<Breadcrumbs>
			<Link href="/">Home</Link>
			{items.map((item, i) => (
				<Link key={i} href={item.href || '#'}>
					{item.label}
				</Link>
			))}
		</Breadcrumbs>
	);
}
