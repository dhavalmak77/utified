import iconv from 'iconv-lite';

export const base64Conversions = (conversionType, text, encoding) => {
	let converted = '';

	try {
		if (['input', 'ENCODE'].includes(conversionType)) {
			const encodedBuffer = iconv.encode(text, encoding);
			converted = encodedBuffer.toString('base64');
		} else {
			const decodedBuffer = Buffer.from(text, 'base64');
			converted = iconv.decode(decodedBuffer, encoding);
		}
		
		return {
			status: true,
			data: converted
		};
	} catch (error) {
		return {
			status: false,
			data: error.message
		}
	}
}