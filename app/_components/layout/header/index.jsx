import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import { useMantineColorScheme, Button } from '@mantine/core';

import { LuPanelLeftClose, LuPanelRightClose } from 'react-icons/lu';
import { ThemeMode } from './ThemeMode';
import { SearchBar } from './SearchBar';

function CustomBurger({ opened, onClick, show }) {
	// const baseClasses = 'p-2 rounded hover:bg-zinc-800 transition-colors';
	const baseClasses = '';
	const visibilityClass = show === 'mobile' ? 'sm:hidden' : 'hidden sm:inline-flex';

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${visibilityClass}`}
		>
			{opened ? <LuPanelLeftClose size={24} /> : <LuPanelRightClose size={24} />}
			{/* {opened ? <TbLayoutSidebarLeftCollapseFilled size={26} /> : <TbLayoutSidebarLeftExpandFilled size={26} />} */}
		</button>
	);
}

const AppHeader = ({ mobileOpened, toggleMobile, desktopOpened, toggleDesktop }) => {
	return (
		<AppShell.Header>
			<Group
				h='100%'
				px='md'
				justify='space-between'
			>
				<Group>
					{/* Left Sidebar Toggle */}
					<CustomBurger
						opened={mobileOpened}
						onClick={toggleMobile}
						show='mobile'
					/>
					<CustomBurger
						opened={desktopOpened}
						onClick={toggleDesktop}
						show='desktop'
					/>

					{/* Utified Logo */}
					<Link href='/'>
						<MantineLogo size={30} />
					</Link>
				</Group>

				<Group>
					{/* Site Navigation */}
					<Group
						ml='xl'
						gap={15}
						visibleFrom='sm'
					>
						<UnstyledButton>Home</UnstyledButton>
						<UnstyledButton>Blog</UnstyledButton>
						<UnstyledButton>Contacts</UnstyledButton>
						<UnstyledButton>Support</UnstyledButton>
					</Group>

					{/* Search Bar */}
					<SearchBar />

					{/* Theme Mode */}
					<ThemeMode />
				</Group>
			</Group>
		</AppShell.Header>
	);
}

export default AppHeader;