'use server';
import bcrypt from 'bcrypt';

const generateBcryptHash = async (data, saltRounds = 10) => {
	return await bcrypt.hash(data, saltRounds);
};

export { generateBcryptHash };