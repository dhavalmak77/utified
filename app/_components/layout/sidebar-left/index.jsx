// import { AppShell, Badge, NavLink, Skeleton } from '@mantine/core';
// import { TbHome2, TbGauge, TbChevronRight, TbActivity, TbCircleOff, TbFingerprint } from 'react-icons/tb';

// const AppSiderLeft = () => {	
// 	return (
// 		<AppShell.Navbar p='md'>
// 			{/* OLD CODES */}
// 				{/* Navbar
// 					{Array(15)
// 						.fill(0)
// 						.map((_, index) => (
// 							<Skeleton key={index} h={28} mt="sm" animate={false} />
// 						))}
// 				<AppShell.Section>Navbar header</AppShell.Section> */}
				{/* <AppShell.Section grow my="md" component={ScrollArea}>
						60 links in a scrollable section
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<Skeleton key={index} h={28} mt="sm" animate={false} />
							))}
					</AppShell.Section>
// 				<AppShell.Section>Navbar footer – always at the bottom</AppShell.Section> */}
// 			{/* OLD CODES END */}

// 			<NavLink
// 				label='Home'
// 				href='/'
// 				leftSection={<TbHome2 size={18} />}
// 				rightSection={<TbChevronRight size={14} />}
// 			/>

// 			<NavLink
// 				href='#required-for-focus'
// 				label='First parent link'
// 				leftSection={<TbGauge size={16} />}
// 				childrenOffset={28}
// 			>
// 				<NavLink
// 					href='#required-for-focus'
// 					label='First child link'
// 				/>
// 				<NavLink
// 					label='Second child link'
// 					href='#required-for-focus'
// 				/>
// 				<NavLink
// 					label='Nested parent link'
// 					childrenOffset={28}
// 					href='#required-for-focus'
// 				>
// 					<NavLink
// 						label='First child link'
// 						href='#required-for-focus'
// 					/>
// 					<NavLink
// 						label='Second child link'
// 						href='#required-for-focus'
// 					/>
// 					<NavLink
// 						label='Third child link'
// 						href='#required-for-focus'
// 					/>
// 				</NavLink>
// 			</NavLink>

// 			<NavLink
// 				href='#required-for-focus'
// 				label='Second parent link'
// 				leftSection={<TbFingerprint size={16} />}
// 				childrenOffset={28}
// 				defaultOpened
// 			>
// 				<NavLink
// 					label='First child link'
// 					href='#required-for-focus'
// 				/>
// 				<NavLink
// 					label='Second child link'
// 					href='#required-for-focus'
// 				/>
// 				<NavLink
// 					label='Third child link'
// 					href='#required-for-focus'
// 				/>
// 			</NavLink>

// 			<NavLink
// 				href='#required-for-focus'
// 				label='With icon'
// 				leftSection={<TbHome2 size={16} />}
// 			/>
// 			<NavLink
// 				href='#required-for-focus'
// 				label='Disabled'
// 				leftSection={<TbCircleOff size={16} />}
// 				disabled
// 			/>
// 			<NavLink
// 				href='#required-for-focus'
// 				label='With description'
// 				description='Additional information'
// 				leftSection={
// 					<Badge
// 						size='xs'
// 						color='red'
// 						circle
// 					>
// 						3
// 					</Badge>
// 				}
// 			/>
// 			<NavLink
// 				href='#required-for-focus'
// 				label='Active subtle'
// 				leftSection={<TbActivity size={16} />}
// 				rightSection={
// 					<TbChevronRight
// 						size={12}
// 						className='mantine-rotate-rtl'
// 					/>
// 				}
// 				// variant='subtle'
// 				active
// 			/>
// 		</AppShell.Navbar>
// 	);
// }

// export default AppSiderLeft;

// import { AppShell, Badge, NavLink, Text, Divider } from '@mantine/core';
// import { TbHome2, TbGauge, TbChevronRight, TbActivity, TbCircleOff, TbFingerprint, TbTools, TbLock } from 'react-icons/tb';

// const AppSiderLeft = () => {
// 	return (
// 		<AppShell.Navbar p='md'>
// 			{/* --- SECTION: General --- */}
// 			<Text
// 				fw={500}
// 				size='sm'
// 				mb='xs'
// 			>
// 				General
// 			</Text>
// 			<NavLink
// 				label='Home'
// 				href='/'
// 				leftSection={<TbHome2 size={18} />}
// 				rightSection={<TbChevronRight size={14} />}
// 			/>

// 			<Divider my='sm' />

// 			{/* --- SECTION: Tools --- */}
// 			<Text
// 				fw={500}
// 				size='sm'
// 				mb='xs'
// 			>
// 				Tools
// 			</Text>
// 			<NavLink
// 				label='Tools Dashboard'
// 				href='#'
// 				leftSection={<TbTools size={16} />}
// 				childrenOffset={28}
// 			>
// 				<NavLink
// 					label='Text Utilities'
// 					href='/text-tools'
// 				/>
// 				<NavLink
// 					label='JSON Tools'
// 					href='/json-tools'
// 				/>
// 				<NavLink
// 					label='Base64 Tools'
// 					href='/base64-tools'
// 				/>
// 				<NavLink
// 					label='QR Code Tools'
// 					href='/qr-code-tools'
// 				/>
// 			</NavLink>

// 			<Divider my='sm' />

// 			{/* --- SECTION: Security --- */}
// 			<Text
// 				fw={500}
// 				size='sm'
// 				mb='xs'
// 			>
// 				Security
// 			</Text>
// 			<NavLink
// 				label='One-Time Secret'
// 				href='/one-time-secret'
// 				leftSection={<TbLock size={16} />}
// 			/>
// 			<NavLink
// 				label='Hash Generators'
// 				href='/hash-tools'
// 				leftSection={<TbFingerprint size={16} />}
// 			/>

// 			<Divider my='sm' />

// 			{/* --- SECTION: Advanced --- */}
// 			<Text
// 				fw={500}
// 				size='sm'
// 				mb='xs'
// 			>
// 				Advanced
// 			</Text>
// 			<NavLink
// 				label='Nested Navigation'
// 				href='#'
// 				leftSection={<TbGauge size={16} />}
// 				childrenOffset={28}
// 			>
// 				<NavLink
// 					label='Nested Link 1'
// 					href='#'
// 				/>
// 				<NavLink
// 					label='Nested Link 2'
// 					href='#'
// 				/>
// 			</NavLink>

// 			<NavLink
// 				label='Disabled Tool'
// 				leftSection={<TbCircleOff size={16} />}
// 				disabled
// 			/>

// 			<NavLink
// 				label='Notifications'
// 				description='3 unread alerts'
// 				leftSection={
// 					<Badge
// 						size='xs'
// 						color='red'
// 						circle
// 					>
// 						3
// 					</Badge>
// 				}
// 			/>

// 			<NavLink
// 				label='Active subtle'
// 				leftSection={<TbActivity size={16} />}
// 				rightSection={
// 					<TbChevronRight
// 						size={12}
// 						className='mantine-rotate-rtl'
// 					/>
// 				}
// 				active
// 			/>
// 		</AppShell.Navbar>
// 	);
// };

// export default AppSiderLeft;



import { AppShell, Badge, NavLink, Text, Divider, ScrollArea, Box } from '@mantine/core';
import { TbHome2, TbGauge, TbChevronRight, TbActivity, TbCircleOff, TbFingerprint, TbTools, TbLock } from 'react-icons/tb';
import { SIDER_NAVIGATION } from './SidebarNavigation';
import Link from 'next/link';

const AppSiderLeft = () => {
	return (
		<AppShell.Navbar p='md' /*withBorder style={{ height: '100vh' }}*/>
			<ScrollArea
				offsetScrollbars
				scrollbarSize={6}
				type='auto'
				style={{ height: '100%' }}
			>
				{/* --- SECTION: General --- */}
				{/* <Text
					fw={500}
					size='sm'
					mb='xs'
				>
					General
				</Text>
				<NavLink
					label='Home'
					href='/'
					leftSection={<TbHome2 size={18} />}
					rightSection={<TbChevronRight size={14} />}
				/> */}

				{SIDER_NAVIGATION.map((section, sectionIndex) => (
					<Box key={section.key}>
						{/* Section Label */}
						{section.isSection && (
							<Text
								fw={500}
								size='sm'
								mb='xs'
							>
								{section.label}
							</Text>
						)}

						{/* Section Children */}
						{section.children?.map((link) => {
							const hasNestedChildren = Array.isArray(link.children) && link.children.length > 0;

							if (hasNestedChildren) {
								return (
									<NavLink
										component={Link}
										key={link.key}
										label={link.label}
										description={link.description}
										href={link.href ?? '#'}
										leftSection={link.leftSection}
										rightSection={link.rightSection}
										childrenOffset={link.childrenOffset ?? 24}
										disabled={link.disabled || link.isDisabled}
										active={link.active}
									>
										{/* Scrollable nested links */}
										<AppShell.Section
											grow
											component={ScrollArea}
											mah={200}
										>
											{link.children.map((child) => (
												<NavLink
													component={Link}
													key={child.key}
													label={child.label}
													description={child.description}
													href={child.href ?? '#'}
													leftSection={child.leftSection}
													rightSection={child.rightSection}
													disabled={child.disabled || child.isDisabled}
													active={child.active}
												/>
											))}
										</AppShell.Section>
									</NavLink>
								);
							}
								
							return (
								<NavLink
									component={Link}
									key={link.key}
									label={link.label}
									description={link.description}
									href={link.href ?? '#'}
									leftSection={link.leftSection}
									rightSection={link.rightSection}
									disabled={link.disabled || link.isDisabled}
									active={link.active}
								/>
							);
						})}

						{/* Divider between sections (except after last one) */}
						{sectionIndex < SIDER_NAVIGATION.length - 1 && <Divider my='sm' />}
					</Box>
				))}
			</ScrollArea>
		</AppShell.Navbar>
	);
};

export default AppSiderLeft;
