import Link from 'next/link';
import { TbArrowNarrowRight, TbBracketsAngle, TbBrandOpenSource, TbChevronRight, TbCode, TbCodeDots, TbFileCode, TbFileSpreadsheet, TbFingerprint, TbGauge, TbHash, TbHome2, TbInfoCircle, TbKey, TbLayoutDashboard, TbLetterCase, TbLink, TbMail, TbPassword, TbShieldLock, TbTextRecognition, TbTools, TbTransform, TbTypography, TbUserCheck } from 'react-icons/tb';

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
		href: '/tools',
		isSection: true,
		children: [
			// 🔠 TEXT UTILITIES
			{
				label: 'Text Utilities',
				key: 'text-utilities',
				// href: '/tools/text-utilities',
				isSection: true,
				leftSection: <TbTypography size={18} />,
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
					},
				],
			},

			// 🔐 SECURITY TOOLS
			{
				label: 'Security Tools',
				key: 'security-tools',
				isSection: true,
				leftSection: <TbShieldLock size={18} />,
				children: [
					{
						label: 'Password Generator',
						key: 'password-generator',
						href: '/tools/security/password-generator',
						leftSection: <TbKey size={18} />,
					},
					{
						label: 'Memorable Password Generator',
						key: 'memorable-password-generator',
						href: '/tools/security/memorable-password-generator',
						leftSection: <TbUserCheck size={18} />,
					},
				],
			},

			// 🔁 CONVERTERS
			{
				label: 'Converters',
				key: 'converters-tools',
				isSection: true,
				leftSection: <TbTransform size={18} />,
				description: 'Format conversion tools',
				children: [
					{
						label: 'Base64 Encoder/Decoder',
						key: 'base64',
						href: '/tools/converter/base64',
						leftSection: <TbCode size={18} />,
					},
					{
						label: 'HTML Entity Encoder/Decoder',
						key: 'html-entity-encoder-decoder',
						href: '/tools/converter/html-entity-encoder-decoder',
						leftSection: <TbCodeDots size={18} />,
					},
					{
						label: 'URL Encoder/Decoder',
						key: 'url-encoder-decoder',
						href: '/tools/converter/url-encoder-decoder',
						leftSection: <TbLink size={18} />,
					},
					{
						label: 'JSON ↔ Object Converter',
						key: 'json-object-converter',
						href: '/tools/converter/json-object-converter',
						leftSection: <TbBracketsAngle size={18} />,
					},
					{
						label: 'CSV ↔ JSON Converter',
						key: 'csv-json-converter',
						href: '/tools/converter/csv-json-converter',
						leftSection: <TbFileSpreadsheet size={18} />,
					},
					{
						label: 'XML ↔ JSON Converter',
						key: 'xml-json-converter',
						href: '/tools/converter/xml-json-converter',
						leftSection: <TbFileCode size={18} />,
					},
				],
			},

			// 🔒 HASHING TOOLS
			{
				label: 'Hashing Tools',
				key: 'hashing-tools',
				isSection: true,
				leftSection: <TbFingerprint size={18} />,
				description: 'Generate one-way cryptographic hashes',
				children: [
					{
						label: 'bcrypt Hash',
						key: 'bcrypt-hash',
						href: '/tools/hash/bcrypt',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'scrypt Hash',
						key: 'scrypt-hash',
						href: '/tools/hash/scrypt',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'argon2 Hash',
						key: 'argon2-hash',
						href: '/tools/hash/argon2',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'MD2 Hash',
						key: 'md2-hash',
						href: '/tools/hash/md2',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'MD4 Hash',
						key: 'md4-hash',
						href: '/tools/hash/md4',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'MD5 Hash',
						key: 'md5-hash',
						href: '/tools/hash/md5',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'MD6 Hash',
						key: 'md6-hash',
						href: '/tools/hash/md6',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-1 Hash',
						key: 'sha1-hash',
						href: '/tools/hash/sha1',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-2 Hash',
						key: 'sha2-hash',
						href: '/tools/hash/sha2',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-224 Hash',
						key: 'sha224-hash',
						href: '/tools/hash/sha224',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-256 Hash',
						key: 'sha256-hash',
						href: '/tools/hash/sha256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-384 Hash',
						key: 'sha384-hash',
						href: '/tools/hash/sha384',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-512 Hash',
						key: 'sha512-hash',
						href: '/tools/hash/sha512',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-512/224 Hash',
						key: 'sha512-224-hash',
						href: '/tools/hash/sha512-224',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-512/256 Hash',
						key: 'sha512-256-hash',
						href: '/tools/hash/sha512-256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-3 Hash',
						key: 'sha3-hash',
						href: '/tools/hash/sha3',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA3-224 Hash',
						key: 'sha3-224-hash',
						href: '/tools/hash/sha3-224',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA3-256 Hash',
						key: 'sha3-256-hash',
						href: '/tools/hash/sha3-256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA3-384 Hash',
						key: 'sha3-384-hash',
						href: '/tools/hash/sha3-384',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA3-512 Hash',
						key: 'sha3-512-hash',
						href: '/tools/hash/sha3-512',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'keccak224 Hash',
						key: 'keccak224-hash',
						href: '/tools/hash/keccak224',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'keccak256 Hash',
						key: 'keccak256-hash',
						href: '/tools/hash/keccak256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'keccak384 Hash',
						key: 'keccak384-hash',
						href: '/tools/hash/keccak384',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'keccak512 Hash',
						key: 'keccak512-hash',
						href: '/tools/hash/keccak512',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHAKE128 Hash',
						key: 'shake128-hash',
						href: '/tools/hash/shake128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHAKE256 Hash',
						key: 'shake256-hash',
						href: '/tools/hash/shake256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'cSHAKE128 Hash',
						key: 'cshake128-hash',
						href: '/tools/hash/cshake128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'cSHAKE256 Hash',
						key: 'cshake256-hash',
						href: '/tools/hash/cshake256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'KMAC128 Hash',
						key: 'kmac128-hash',
						href: '/tools/hash/kmac128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'KMAC256 Hash',
						key: 'kmac256-hash',
						href: '/tools/hash/kmac256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'BLAKE2b Hash',
						key: 'blake2b-hash',
						href: '/tools/hash/blake2b',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'BLAKE2s Hash',
						key: 'blake2s-hash',
						href: '/tools/hash/blake2s',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'BLAKE3 Hash',
						key: 'blake3-hash',
						href: '/tools/hash/blake3',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'RIPEMD128 Hash',
						key: 'ripemd128-hash',
						href: '/tools/hash/ripemd128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'RIPEMD160 Hash',
						key: 'ripemd160-hash',
						href: '/tools/hash/ripemd160',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'RIPEMD256 Hash',
						key: 'ripemd256-hash',
						href: '/tools/hash/ripemd256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'RIPEMD320 Hash',
						key: 'ripemd320-hash',
						href: '/tools/hash/ripemd320',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SHA-0 Hash',
						key: 'sha0-hash',
						href: '/tools/hash/sha0',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Whirlpool Hash',
						key: 'whirlpool-hash',
						href: '/tools/hash/whirlpool',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'CRC16 Hash',
						key: 'crc16-hash',
						href: '/tools/hash/crc16',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'CRC32 Hash',
						key: 'crc32-hash',
						href: '/tools/hash/crc32',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'NTLM Hash',
						key: 'ntlm-hash',
						href: '/tools/hash/ntlm',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'SM3 Hash',
						key: 'sm3-hash',
						href: '/tools/hash/sm3',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Snefru Hash',
						key: 'snefru-hash',
						href: '/tools/hash/snefru',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Tiger-128 Hash',
						key: 'tiger-128-hash',
						href: '/tools/hash/tiger-128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Tiger-160 Hash',
						key: 'tiger-160-hash',
						href: '/tools/hash/tiger-160',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Tiger-192 Hash',
						key: 'tiger-192-hash',
						href: '/tools/hash/tiger-192',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Haval-128 Hash',
						key: 'haval-128-hash',
						href: '/tools/hash/haval-128',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Haval-160 Hash',
						key: 'haval-160-hash',
						href: '/tools/hash/haval-160',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Haval-192 Hash',
						key: 'haval-192-hash',
						href: '/tools/hash/haval-192',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Haval-224 Hash',
						key: 'haval-224-hash',
						href: '/tools/hash/haval-224',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Haval-256 Hash',
						key: 'haval-256-hash',
						href: '/tools/hash/haval-256',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Gost Hash',
						key: 'gost-hash',
						href: '/tools/hash/gost',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Adler32 Hash',
						key: 'adler32-hash',
						href: '/tools/hash/adler32',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'FNV Hash',
						key: 'fnv-hash',
						href: '/tools/hash/fnv',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'Joaat Hash',
						key: 'joaat-hash',
						href: '/tools/hash/joaat',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'CRC32B Hash',
						key: 'crc32b-hash',
						href: '/tools/hash/crc32b',
						leftSection: <TbHash size={18} />,
					},
					{
						label: 'CRC32C Hash',
						key: 'crc32c-hash',
						href: '/tools/hash/crc32c',
						leftSection: <TbHash size={18} />,
					}
				]
			}
		]
	}
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
		key: 'sidebar',
		children: [
			{
				label: 'Text Generators',
				key: 'sidebar-text',
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
