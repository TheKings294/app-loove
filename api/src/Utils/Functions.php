<?php

namespace App\Utils;

use DateTime;
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
    static function isValidDOB(string $dob, int $minAge = 18): bool
    {
        try {
            $birthDate = DateTime::createFromFormat('Y-m-d', $dob);
            $today = new DateTime();

            if ($birthDate > $today) {
                return false;
            }

            $age = $today->diff($birthDate)->y;

            return $age >= $minAge;
        } catch (Exception $e) {
            return false;
        }
    }
    static function getPrivateChannelName($userId1, $userId2) {
        $ids = [$userId1, $userId2];
        sort($ids);
        return "private-chat." . $ids[0] . "_" . $ids[1];
    }

}