const sanitizeText = (text) => text.replace(/[\_\-\{\}\[\]\(\)\*\&\^\%\$\#\@\!\~\`\+\-\/\\\.\,\?]+/g, ' ').replace(/\s\s+/g, ' ').trim();
const upperCaseFirst = word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
const lowerCaseWord = word => word.toLowerCase();
const upperCaseWord = word => word.toUpperCase();

export const textTranformations = {
	uppercase: {
		label: 'UPPERCASE',
		fn: text => text.toUpperCase()
	},
	lowercase: {
		label: 'lowercase',
		fn: text => text.toLowerCase()
	},
	capitalize: {
		label: 'Capitalize',
		fn: text => text.split(' ').map(upperCaseFirst).join(' ')
	},
	camelcase: {
		label: 'camelCase',
		fn: text => sanitizeText(text).replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? lowerCaseWord(word) : upperCaseFirst(word)).replace(/\s+/g, '')
	},
	pascalcase: {
		label: 'PascalCase',
		fn: text => sanitizeText(text).replace(/(?:^\w|[A-Z]|\b\w)/g, upperCaseFirst).replace(/\s+/g, '')
	},
	kebabcase: {
		label: 'kebab-case',
		fn: text => sanitizeText(text).toLowerCase().replace(/\s+/g, '-')
	},
	snakecase: {
		label: 'snack_case',
		fn: text => sanitizeText(text).toLowerCase().replace(/\s+/g, '_')
	},
	constantcase: {
		label: 'CONSTANT_CASE',
		fn: text => sanitizeText(text).toUpperCase().replace(/\s+/g, '_')
	},
	dotcase: {
		label: 'dot.case',
		fn: text => sanitizeText(text).toLowerCase().replace(/\s+/g, '.')
	},
	spacecase: {
		label: 'space case',
		fn: text => sanitizeText(text).toLowerCase()
	},
	reversecase: {
		label: 'reverse case',
		fn: text => text.split('').reverse().join('')
	},
	randomcase: {
		label: 'rANdOm CASe',
		fn: text => text.split('').map(char => Math.random() < 0.5 ? upperCaseWord(char) : lowerCaseWord(char)).join('')
	},
	inversecase: {
		label: 'iNVERSE cASE',
		fn: text => text.replace(/[a-z]/ig, char => char === char.toUpperCase() ? lowerCaseWord(char) : upperCaseWord(char))
	},
	alternativecase: {
		label: 'aLtErNaTiVe cAsE',
		fn: text => text.split('').map((char, i) => i % 2 === 0 ? upperCaseWord(char) : lowerCaseWord(char)).join('')
	}
};

export const convertTextCase = (type, text) => {
	const transform = textTranformations[type].fn;
	return transform ? transform(text) : text;
};