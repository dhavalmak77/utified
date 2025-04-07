import { Text } from '@mantine/core'

export const PageDescription = ({ children, description}) => {
	return (
		<Text pb={12}>{children || description}</Text>
	)
}
