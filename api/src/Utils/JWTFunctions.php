<?php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JWTFunctions
{
    static function createJWTToken(int $userId, string $username, string $role): string
    {
        $payload = [
            'iss' => 'api.clink.local',
            'aud' => 'clink.local',
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + 3600,
            'data' => [
                'userId' => $userId,
                'username' => $username,
                'role' => $role
            ]
        ];

        return JWT::encode($payload, $_ENV['JWT_PRIVATE_KEY'], 'HS256');
    }
    static function checkInBearerToken(): bool | string
    {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            return false;
        }

        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }

        return false;
    }
    static function decodeJWTToken(string $token): mixed
    {
        try {
            return JWT::decode($token, new Key($_ENV['JWT_PRIVATE_KEY'], 'HS256'));
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token: ' . $e->getMessage()]);
        }
        return true;
    }
}