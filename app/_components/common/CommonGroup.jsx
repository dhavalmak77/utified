import { Group } from '@mantine/core';

const CommonGroup = ({ children, spacing = 0, gap = 10, justifyBetween, ...props }) => {
	const groupProps = {
		spacing,
		gap,
		...(justifyBetween ? { justify: 'space-between' } : {}),
		...props,
	};

	return <Group {...groupProps}>{children}</Group>;
};

export default CommonGroup;
