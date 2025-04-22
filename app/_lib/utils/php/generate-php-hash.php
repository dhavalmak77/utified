<?php

$params = json_decode($argv[1], true);
extract($params, EXTR_PREFIX_ALL, "request");

echo hash($request_hash, $request_data);