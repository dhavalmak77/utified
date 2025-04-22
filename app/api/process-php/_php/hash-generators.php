<?php

// Retrieve all parameters passed to the script
$params = json_decode($argv[1], true); // Decode the JSON string passed from Node.js

// Extract parameters with a prefix to avoid naming conflicts
extract($params, EXTR_PREFIX_ALL, "request");

// Prepare response data
$response = [
    'status' => 'success',
    'message' => 'PHP script executed successfully',
    'data' => [],
    'timestamp' => date('c') // Add ISO 8601 formatted timestamp
];

// Add query params, body, and headers to the response
$response['data']['query'] = $query ?? [];
$response['data']['body'] = $body ?? []; // Ensure this matches your request structure
$response['data']['headers'] = $headers ?? [];

// Function to get hash algorithms and their lengths
function allhash($data) {
    $hashInfo = [];
    $index = 1;

    foreach(hash_algos() as $algorithm) {
        $hashLength = strlen(hash($algorithm, $data));
        $hashInfo[$algorithm] = $hashLength;
        // $hashInfo[] = "$index: $algorithm $hashLength";
        $index++;
    }

    return $hashInfo;
}

// Add the hashes information to the response
$response['hashes'] = allhash(1); // Call the function with the request body
$response['hashes_count'] = count(hash_algos());
$response['f1'] = $request_query ?? null; // Set to null if not set

// Send the response as JSON
echo json_encode($response);
