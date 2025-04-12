import { Title } from '@mantine/core'

export const PageTitle = ({ children, title }) => {
	return (
		<Title
			order={1}
			textWrap="wrap"
			size="h1"
			fw={600}
			mt="xs"
		>
			{children || title}
		</Title>
	)
}
