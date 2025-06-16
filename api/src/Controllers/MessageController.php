<?php

namespace App\Controllers;

use App\Repositories\MessageRepositories;
use App\Utils\Functions;
use App\Utils\JWTFunctions;
use Monolog\Logger;
use Pusher\Pusher;
use App\Utils\Notif;

class MessageController extends BaseController {
    private $messageRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this-> messageRepo = new MessageRepositories();
    }
    public function pusherAuth()
    {
        $pusher = new Pusher(
            $_ENV['PUSHER_API_KEY'],
            $_ENV['PUSHER_SECRET'],
            $_ENV['PUSHER_APP_ID'],
            [
                'cluster' => $_ENV['PUSHER_CLUSTER'],
                'useTLS' => true
            ]
        );

        $token = JWTFunctions::checkInBearerToken();
        $tokenData = JWTFunctions::decodeJWTToken($token);

        $currentUserId = $tokenData->data->userId ?? null;

        if (!$currentUserId) {
            http_response_code(403);
            return json_encode(['message' => $tokenData]);
        }

        $channel = $_POST["channel_name"];
        $socket_id = $_POST["socket_id"];

        if (preg_match('/private-chat\.(\d+)_(\d+)/', $channel, $matches)) {
            $user1 = intval($matches[1]);
            $user2 = intval($matches[2]);

            if ($currentUserId === $user1 || $currentUserId === $user2) {
                return $pusher->socket_auth($channel, $socket_id);
            }
        }

        http_response_code(403);
        return json_encode(['message' => 'You are not authorized to access this page.']);
    }
    public function sendMessage(string $idA, string $idB, string $convID)
    {
        $message = !empty($_POST['message']) ? Functions::cleanCodeString($_POST['message']) : null;

        if (!Functions::checkIfIsNotNull([$message])) {
            http_response_code(406);
            return json_encode(['message' => 'Message cannot be empty.']);
        }

        $this->messageRepo->newMessage($idA, $convID, $message);

        $pusher = new Pusher(
            $_ENV['PUSHER_API_KEY'],
            $_ENV['PUSHER_SECRET'],
            $_ENV['PUSHER_APP_ID'],
            [
                'cluster' => $_ENV['PUSHER_CLUSTER'],
                'useTLS' => true
            ]
        );

        $channelName = "private-chat." . min($idA, $idB) . "_" . max($idA, $idB);

        $messageID = uniqid();

        $pusher->trigger($channelName, 'new-message', [
            'from' => $idA,
            'to' => $idB,
            'message' => $message,
            'timestamp' => date('Y-m-d H:i:s'),
            'message_id' => $messageID
        ]);

        Notif::newNotification("Nouveau message", $message, $idB, intval($messageID), 1);

        return json_encode(['message' => 'Message sent.']);
    }
    public function getAllMessagesOfConv(string $convID)
    {
        return json_encode(['data' => $this->messageRepo->getMessagesOfConv(intval($convID))]);
    }
}