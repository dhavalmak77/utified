import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Set up __dirname and __filename for compatibility with ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the handler to process all types of requests
const handler = async (request, { params }) => {
	try {
		const { method } = request;
		const searchParams = request.nextUrl.searchParams;

		// Structure to hold all potential parameters
		const requestData = {
			query: {},
			requestBody: {},
			requestHeaders: {},
			params
		};

		// Capture query parameters
		for (const [key, value] of searchParams) {
			requestData.query[key] = value;
		}

		console.log(requestData)
		// Capture body if method supports it (POST, PUT, etc.)
		if (['POST', 'PUT', 'PATCH'].includes(method)) {
			const body = await request.json(); // Assumes JSON body
			requestData.requestBody = body;
		}

		// Capture headers
		requestData.requestHeaders = Object.fromEntries(request.headers.entries());

		// Absolute path for the PHP script
		const phpScriptPath = path.join(__dirname, '_php', '/hello-world.php');

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
			parsedResponse.timestamp = new Date().toISOString()
		}

		// stringify updated response
		parsedResponse = JSON.stringify(parsedResponse);

		// If everything went fine, send back the PHP response
		return new Response(parsedResponse, { headers: { 'Content-Type': 'application/json' } });
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
