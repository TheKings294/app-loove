<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories;

class LikeRepositories extends BaseRepositories
{
    public function setLike(int $userLiked, int $userId)
    {
        $this
            ->query("INSERT INTO `like` (user_liked, user) VALUES (:userLiked, :user)")
            ->execute([
                'userLiked' => $userLiked,
                'user' => $userId
            ]);
    }
    public function checkIfIsMatch(int $userId, int $userLiked)
    {
        $sql = "SELECT * FROM `like` WHERE user = :userLiked AND user_liked = :user";
        $stmt = $this->query($sql);
        $stmt->execute([
            'userLiked' => $userLiked,
            'user' => $userId
        ]);
        return $stmt->fetch();

        /*
         *  $result = $this
            ->query("SELECT * FROM `like` WHERE user_liked = :userLiked AND user = :user")
            ->fetch([
                'userLiked' => $userId,
                'user' => $userLiked
            ]);

            return $result;
         * */
    }
    public function setUnlike(int $userUnliked, int $userId)
    {
        $this
            ->query("INSERT INTO `un_like` (user_unlike, user) VALUES (:userLiked, :user)")
            ->execute([
                'userLiked' => $userUnliked,
                'user' => $userId
            ]);
    }
}