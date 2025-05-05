<?php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

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
}