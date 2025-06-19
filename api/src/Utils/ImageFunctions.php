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
            unlink($_SERVER['DOCUMENT_ROOT'] . UPLOAD_DIRECTORY . $filename);
            return true;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    static function moveFileByCopy(string $tmpFile, string $file): bool | string
    {
        try {
            file_put_contents($_SERVER['DOCUMENT_ROOT']. UPLOAD_DIRECTORY . $file, file_get_contents($tmpFile));
            return true;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}