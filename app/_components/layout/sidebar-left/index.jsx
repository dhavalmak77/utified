import { AppShell, Skeleton } from '@mantine/core';

const AppSiderLeft = () => {
	return (
		<AppShell.Navbar p="md">
			Navbar
			{Array(15)
				.fill(0)
				.map((_, index) => (
					<Skeleton key={index} h={28} mt="sm" animate={false} />
				))}
			<AppShell.Section>Navbar header</AppShell.Section>
			{/* <AppShell.Section grow my="md" component={ScrollArea}>
				60 links in a scrollable section
				{Array(5)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} h={28} mt="sm" animate={false} />
					))}
			</AppShell.Section>
			<AppShell.Section>Navbar footer – always at the bottom</AppShell.Section> */}
		</AppShell.Navbar>
	)
}

export default AppSiderLeft;