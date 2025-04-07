import { Title } from '@mantine/core'

export const PageTitle = ({ children, title }) => {
	return (
		<Title
			order={1}
			textWrap="wrap"
			size="h1"
			mt="xs"
		>
			{children || title}
		</Title>
	)
}
