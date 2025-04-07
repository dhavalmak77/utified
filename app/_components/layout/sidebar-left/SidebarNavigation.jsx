import Link from 'next/link';
import { TbArrowNarrowRight, TbBrandOpenSource, TbChevronRight, TbFingerprint, TbGauge, TbHome2, TbInfoCircle, TbLayoutDashboard, TbLetterCase, TbMail, TbTextRecognition, TbTools, TbTypography } from 'react-icons/tb';

const createLink = (href, label) => ({
	label: <Link href={href}>{label}</Link>,
	key: href.replace(/\//g, '-').slice(1),
	href,
});

export const SIDER_NAVIGATION = [
	{
		label: 'General',
		key: 'section-general',
		isSection: true,
		children: [
			{
				label: 'Home',
				key: 'home',
				href: '/',
				leftSection: <TbHome2 size={18} />,
				isSection: true,
			},
			{
				label: 'About',
				key: 'about',
				href: '/about',
				leftSection: <TbInfoCircle size={18} />,
				isSection: true,
			},
			{
				label: 'Contact',
				key: 'contact',
				href: '/contact',
				leftSection: <TbMail size={18} />,
				isSection: true,
			},
		],
	},
	{
		label: 'Tools',
		key: 'section-tools',
		isSection: true,
		children: [
			{
				label: 'Text',
				key: 'text-tools',
				isSection: true,
				// disabled: true,
				leftSection: <TbTypography size={18} />,
				// childrenOffset: 14,
				description: 'Text formatting tools',
				children: [
					{
						label: 'Text Case Converter',
						key: 'text-case-converter',
						href: '/tools/text/case-converter',
						leftSection: <TbLetterCase size={18} />,
					},
					{
						label: 'Slug Generator',
						key: 'slug-generator',
						href: '/tools/text/slug-generator',
						leftSection: <TbBrandOpenSource size={18} />,
					},
					{
						label: 'Text Counter',
						key: 'text-counter',
						href: '/tools/text/text-counter',
						leftSection: <TbTextRecognition size={18} />,
					}
				],
			},
		],
	},
];

export const SIDEBAR_NAVIGATION = [
	{
		label: 'Data Conversion',
		key: 'sidebar-data-conversion',
		children: [
			{
				label: 'JSON Tools',
				key: 'sidebar-json-tools',
				type: 'group',
				children: [createLink('/json-to-object', 'JSON to Object'), createLink('/object-to-json', 'Object to JSON'), createLink('/json-formatter', 'JSON Formatter/Validator'), createLink('/csv-to-json', 'CSV to JSON Converter')],
			},
			{
				label: 'Text Tools',
				key: 'sidebar-text-tools',
				type: 'group',
				children: [createLink('/base64', 'Base64 Encoder/Decoder'), createLink('/url-encoder', 'URL Encoder/Decoder'), createLink('/html-entity', 'HTML Entity Encoder/Decoder'), createLink('/text-case', 'Text Case Converter')],
			},
			{
				label: 'Date/Time Tools',
				key: 'sidebar-date-time-tools',
				type: 'group',
				children: [createLink('/timestamp-converter', 'Timestamp Converter')],
			},
		],
	},
	{
		label: 'Code Utilities',
		key: 'sidebar-code-utilities',
		children: [
			{
				label: 'Code Conversion',
				key: 'sidebar-code-conversion',
				type: 'group',
				children: [createLink('/markdown-to-html', 'Markdown to HTML Converter'), createLink('/html-css-minifier', 'HTML/CSS Minifier')],
			},
			{
				label: 'Code Formatting',
				key: 'sidebar-code-formatting',
				type: 'group',
				children: [createLink('/code-formatter', 'Code Formatter/Beautifier'), createLink('/json-formatter', 'JSON Formatter/Validator')],
			},
			{
				label: 'Regex Tools',
				key: 'sidebar-regex-tools',
				type: 'group',
				children: [createLink('/regex-tester', 'Regex Tester'), createLink('/regex-pattern-generator', 'Regex Pattern Generator')],
			},
		],
	},
	{
		label: 'Generators',
		key: 'sidebar-generators',
		children: [
			{
				label: 'Text Generators',
				key: 'sidebar-text-generators',
				type: 'group',
				children: [createLink('/lorem-ipsum', 'Lorem Ipsum Generator'), createLink('/uuid-generator', 'UUID Generator'), createLink('/password-generator', 'Password Generator')],
			},
			{
				label: 'Graphics',
				key: 'sidebar-graphics',
				type: 'group',
				children: [createLink('/qr-code-generator', 'QR Code Generator'), createLink('/color-picker', 'Color Picker')],
			},
		],
	},
	{
		label: 'Data Analysis',
		key: 'sidebar-data-analysis',
		children: [
			{
				label: 'IP Tools',
				key: 'sidebar-ip-tools',
				type: 'group',
				children: [createLink('/ip-lookup', 'IP Address Lookup'), createLink('/ip-geolocation', 'IP Geolocation')],
			},
			{
				label: 'JWT Tools',
				key: 'sidebar-jwt-tools',
				type: 'group',
				children: [createLink('/jwt-decoder', 'JWT Decoder')],
			},
		],
	},
	{
		label: 'Comparison Tools',
		key: 'sidebar-comparison-tools',
		children: [
			{
				label: 'Text Comparison',
				key: 'sidebar-text-comparison',
				type: 'group',
				children: [createLink('/text-diff-tool', 'Text Diff Tool')],
			},
		],
	},
	{
		label: 'File Management',
		key: 'sidebar-file-management',
		children: [
			{
				label: 'File Conversion',
				key: 'sidebar-file-conversion',
				type: 'group',
				children: [createLink('/csv-to-json', 'CSV to JSON Converter')],
			},
			{
				label: 'File Compression',
				key: 'sidebar-file-compression',
				type: 'group',
				children: [createLink('/image-compressor', 'Image Compressor')],
			},
		],
	},
	{
		label: 'Unit Conversion',
		key: 'sidebar-unit-conversion',
		children: [
			{
				label: 'Measurement Conversion',
				key: 'sidebar-measurement-conversion',
				type: 'group',
				children: [createLink('/length-converter', 'Length Converter'), createLink('/weight-converter', 'Weight Converter'), createLink('/temperature-converter', 'Temperature Converter')],
			},
		],
	},
];
