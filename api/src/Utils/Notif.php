<?php

namespace App\Utils;

use Pusher\PushNotifications\PushNotifications;

class Notif
{
    static function newNotification(string $title, string $message, int $userID, int $ID, int $type)
    {

        $user = "user-{$userID}";
        var_dump($user);
        $beamsClient = new PushNotifications([
            "instanceId" => $_ENV['PUSHER_INSTANCE'],
            "secretKey" =>  $_ENV['PUSHER_PRIMARY_KEY'],
        ]);

        $beamsClient->publishToInterests(
            [$user],
            [
                "apns" => [
                    "aps" => [
                        "alert" => "Nouveau message",
                    ],
                ],
                "fcm" => [
                    "notification" => [
                        "title" => $title,
                        "body" => $message,
                    ],
                    "data" => [
                        "id" => $ID,
                        "type" => $type
                    ],
                ],
                "web" => [
                    "notification" => [
                        "title" => $title,
                        "body" => $message,
                    ],
                    "data" => [
                        "id" => $ID,
                        "type" => $type
                    ],
                ],
            ]
        );
    }
}