<?php

namespace App\Controllers;

use Monolog\Logger;
use App\Utils\JWTFunctions;

class HomeController extends BaseController {
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
    }

    public function status()
    {
        $token = JWTFunctions::checkInBearerToken();
        if (empty($_SESSION) || !$token) {
            http_response_code(200);
            return json_encode(['message'=>'Not connected', 'code' => 1000]);
        }

        $decoded = JWTFunctions::decodeJWTToken($token);
        if (is_array($decoded)) {
            http_response_code(200);
            return json_encode(['message' => $decoded, 'code' => 1000]);
        }
        return json_encode(['message'=>'All good', 'code' => 2000]);
    }
}