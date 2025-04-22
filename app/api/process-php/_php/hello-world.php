<?php

// Retrieve all parameters passed to the script
$params = json_decode($argv[1], true); // Decode the JSON string passed from Node.js

// Prepare response data
$response = [
    'status' => 'success',
    'message' => 'PHP script executed successfully',
    'data' => [],
    // 'timestamp' => date('c') // Add ISO 8601 formatted timestamp
];

// Add query params, body, and headers to the response
$response['data']['query'] = $params['query'] ?? [];
$response['data']['body'] = $params['body'] ?? [];
$response['data']['headers'] = $params['headers'] ?? [];
$response['data'] = $params;

// Send the response as JSON
 echo json_encode($response);
