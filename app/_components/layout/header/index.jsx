import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';

const AppHeader = ({ mobileOpened, toggleMobile, desktopOpened, toggleDesktop }) => {
		return (
		<AppShell.Header>
			<Group h="100%" px="md">
				<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
				<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
				<MantineLogo size={30} />
				{/* <Group justify="space-between" style={{ flex: 1 }}>
					<MantineLogo size={30} />
					<Group ml="xl" gap={0} visibleFrom="sm">
						<UnstyledButton>Home</UnstyledButton>
						<UnstyledButton>Blog</UnstyledButton>
						<UnstyledButton>Contacts</UnstyledButton>
						<UnstyledButton>Support</UnstyledButton>
					</Group>
				</Group> */}
			</Group>
		</AppShell.Header>
	)
}

export default AppHeader;