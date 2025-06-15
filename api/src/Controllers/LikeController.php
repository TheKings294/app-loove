<?php

namespace App\Controllers;

use App\Utils\JWTFunctions;
use App\Utils\Notif;
use Monolog\Logger;
use App\Repositories\LikeRepositories;
use App\Utils\Functions;

class LikeController extends BaseController
{
    private LikeRepositories $likeRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->likeRepo = new LikeRepositories();
    }
    public function LikeAnUser(string $userId, string $userLiked)
    {
        $userId = intval(Functions::cleanCodeString($userId));
        $userLiked = intval(Functions::cleanCodeString($userLiked));

        $this->likeRepo->setLike($userLiked, $userId);

        if (!empty($this->likeRepo->checkIfIsMatch($userId, $userLiked))) {
            $match = new MatchController($this->logger);
            $conv = new ConvController($this->logger);
            $match->newMatch($userId, $userLiked);
            $conv->newConv($userId, $userLiked);

            Notif::newNotification("Match !!!", "Vous avez un nouveau match", $userLiked, 1);

            http_response_code(200);
            return json_encode(['message' => 'Is match']);
        }

        http_response_code(200);
        return json_encode(['message' => 'Liked is save']);
    }
    public function setUnlike(string $userId, string $userLiked)
    {
        $userId = intval(Functions::cleanCodeString($userId));
        $userLiked = intval(Functions::cleanCodeString($userLiked));

        $this->likeRepo->setUnlike($userLiked, $userId);

        http_response_code(200);
        return json_encode(['message' => 'Unliked is save']);
    }
    public function getLikeME(string $id)
    {
        $token = JWTFunctions::checkInBearerToken();
        $decoded = JWTFunctions::decodeJWTToken($token);
        if (!$decoded->data->premium) {
            http_response_code(401);
            return json_encode(['message' => 'You need to be premium']);
        }

        return json_encode(["data" => $this->likeRepo->getMyLikes(intval($id))]);
    }
    public function getUnlikeME(string $id)
    {
        $token = JWTFunctions::checkInBearerToken();
        $decoded = JWTFunctions::decodeJWTToken($token);
        if (!$decoded->data->premium) {
            http_response_code(401);
            return json_encode(['message' => 'You need to be premium']);
        }
        
        return json_encode(["data" => $this->likeRepo->getMyUnlikes(intval($id))]);
    }
}