import { Text } from '@mantine/core'

export const PageDescription = ({ children, description}) => {
	return (
		<Text>{children || description}</Text>
	)
}
