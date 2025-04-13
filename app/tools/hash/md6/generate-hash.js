'use server';

import md6 from 'md6-hash';

const generateMD6Hash = async (data, size = 256) => {
	return await md6(data, { size });
}

export default generateMD6Hash;