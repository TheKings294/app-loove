<?php

namespace App\Repositories;

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
}