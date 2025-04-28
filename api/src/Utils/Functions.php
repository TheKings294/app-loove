<?php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Functions
{
    static function cleanCodeString(string $code): string
    {
        return htmlspecialchars(trim($code), ENT_QUOTES);
    }
    static function checkIfIsNotNull(array $tabVar): bool
    {
         foreach ($tabVar as $value) {
               if (empty($value)) {
                   return false;
              }
         }
           return true;
    }
    static function createJWTToken(int $userId, string $username): string
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
            ]
        ];

        return JWT::encode($payload, $_ENV['JWT_PRIVATE_KEY'], 'HS256');
    }
}