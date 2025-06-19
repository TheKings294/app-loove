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
    public function getMyLikes(int $userId)
    {
        return $this
            ->query("SELECT 
            l.*, 
            u.id, 
            u.first_name, 
            u.last_name, 
            u.date_of_birth, 
            u.gender, 
            u.city, 
            u.description, 
            u.image 
            FROM `like` l LEFT JOIN users u ON l.user = u.id WHERE l.user_liked = :user")
            ->fetch([
                'user' => $userId
            ]);
    }
    public function getMyUnLikes(int $userId)
    {
        return $this
            ->query("SELECT 
            l.*, 
            u.id, 
            u.first_name, 
            u.last_name, 
            u.date_of_birth, 
            u.gender, 
            u.city, 
            u.description, 
            u.image 
            FROM `un_like` l LEFT JOIN users u ON l.user = u.id WHERE l.user_unlike = :user")
            ->fetch([
                'user' => $userId
            ]);
    }
}