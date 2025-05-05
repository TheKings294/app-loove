<?php

namespace App\Utils;

use Exception;
class ImageFunctions
{
    static function MoveImage(string $tmpFile, string $file): bool | string
    {
        try {
            return move_uploaded_file($tmpFile, $_SERVER['DOCUMENT_ROOT']. UPLOAD_DIRECTORY . $file);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    static function DeleteImage(string $filename): bool | string
    {
        try {
            unlink($_SERVER['DOCUMENT_ROOT'] . '/uploads/' . $filename);
            return true;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}