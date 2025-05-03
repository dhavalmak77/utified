import { Button, FileButton, Tooltip } from '@mantine/core';
import useUtHovers from '@/app/_hooks/useUtHovers';
import { TbCircleCheck, TbQrcode } from 'react-icons/tb';
import { LuUpload } from 'react-icons/lu';

const UploadFileButton = ({ children, title = 'Upload File', onChange, accept, ...restProps }) => {
	const { hovers, refs } = useUtHovers(['uploadFile']);

	return (
		<FileButton onChange={onChange} accept={accept}>
			{(props) => (
				<Button
					variant={hovers.uploadFile ? 'filled' : 'default'}
					leftSection={<LuUpload />}
					{...refs.uploadFile}
					{...restProps}
					{...props}
				>
					{children || title}
				</Button>
			)}
		</FileButton>
	);
};

export default UploadFileButton;
