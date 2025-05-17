<?php

namespace App\Repositories;

use App\Models\Conv;

class ConvRepositories extends BaseRepositories
{
    public function newConv(int $user_A, int $user_B)
    {
        $this
            ->query("INSERT INTO conversation (user_a, user_b) VALUES (:user_a, :user_b)")
            ->execute([
                'user_a' => $user_A,
                'user_b' => $user_B
            ]);
    }
    public function getMyConv(string $user_A): array
    {
        $result = $this
            ->query("SELECT * FROM conversation WHERE user_a = :user OR user_b = :user")
            ->fetch([
                'user' => $user_A,
            ]);
        $convArray = [];
        foreach ($result as $key => $value) {
            $convArray[] = new Conv($value['id'], $value['user_a'], $value['user_b']);
        }
        return $convArray;
    }
}