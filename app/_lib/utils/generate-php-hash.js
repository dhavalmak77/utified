'use server';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the handler to process all types of requests
const generatePhpHash = async (hash, data) => {
	// Absolute path for the PHP script
	const phpScriptPath = path.join(__dirname, 'php', 'generate-php-hash.php');

	const requestData = {
		hash,
		data,
	};

	try {
		const process = spawn('php', [phpScriptPath, JSON.stringify(requestData)]);

		let output = '';
		let errorOutput = '';

		// Use Promise to handle process output asynchronously
		const outputPromise = new Promise((resolve, reject) => {
			process.stdout.on('data', (data) => {
				output += data.toString(); // Accumulate output
			});

			process.stderr.on('data', (data) => {
				errorOutput += data.toString(); // Accumulate errors
			});

			// Handle process exit
			process.on('close', (code) => {
				if (code === 0) {
					// Resolve with output if successful
					resolve({ status: 'success', data: output });
				} else {
					// Reject with error output if there's an error
					reject({ status: 'error', data: errorOutput || 'Unknown error occurred' });
				}
			});
		});

		// Await the output promise to get the final result
		return await outputPromise;

	} catch (error) {
		console.log(error);
		return {
			status: 'error',
			message: error.message,
		};
	}
};

export default generatePhpHash;
