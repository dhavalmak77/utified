import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';

// Set up __dirname and __filename for compatibility with ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to extract request data
const extractRequestData = async (request, params) => {
	const searchParams = request.nextUrl.searchParams;

	const requestData = {
		query: {},
		body: {},
		headers: {},
		params
	};

	// Capture query parameters
	for (const [key, value] of searchParams) {
		requestData.query[key] = value;
	}

	// Capture body if method supports it
	if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
		requestData.body = await request.json(); // Assumes JSON body
	}

	// Capture headers
	requestData.headers = Object.fromEntries(request.headers.entries());

	return requestData;
};

// Define the handler to process all types of requests
const handler = async (request, { params }) => {
	let { utilities } = params;
	const utilityFile = utilities.at(-1);
	utilities = utilities.join('/');

	try {
		// Use the utilities function to extract request data
		const requestData = await extractRequestData(request, params);

		if (!utilityFile.includes('.')) {
			utilities = `${utilities}.php`
		}

		// Absolute path for the dynamic PHP script
		const phpScriptPath = path.join(__dirname, '../_php', utilities);

		// Check if the PHP file exists
		if (!fs.existsSync(phpScriptPath)) {
			// If the file doesn't exist, return a 404 response
			return new Response(JSON.stringify({
				status: 'error',
				message: `The PHP file '${utilities}' was not found.`,
				error: 'Requested file does not found',
				timestamp: new Date().toISOString()
			}), { status: 404, headers: { 'Content-Type': 'application/json' } });
		}

		// Execute the PHP script
		const phpResponse = await new Promise((resolve, reject) => {
			const process = spawn('php', [phpScriptPath, JSON.stringify(requestData)]);

			let output = '';
			let errorOutput = '';

			// Capture stdout (PHP script success output)
			process.stdout.on('data', (data) => {
				output += data.toString(); // Accumulate output in case of multiple chunks
			});

			// Capture stderr (PHP script error output)
			process.stderr.on('data', (data) => {
				errorOutput += data.toString();
			});

			// Handle process exit
			process.on('close', (code) => {
				if (code === 0) {
					// Successful execution
					resolve(output);
				} else {
					// Error in PHP script execution
					reject(new Error(errorOutput.trim() || 'Unknown PHP error occurred'));
				}
			});
		});

		// Parse the PHP response to JSON
		let parsedResponse = JSON.parse(phpResponse);

		if (!('timestamp' in parsedResponse)) {
			parsedResponse.timestamp = new Date().toISOString();
		}

		// Stringify updated response
		const finalResponse = JSON.stringify(parsedResponse);

		// If everything went fine, send back the PHP response
		return new Response(finalResponse, { headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		// Catch any error and return JSON error response
		return new Response(JSON.stringify({
			status: 'error',
			message: 'An error occurred',
			error: error.message,
			timestamp: new Date().toISOString()
		}), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}
};

// Export handlers for different HTTP methods
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
export const TRACE = handler;
