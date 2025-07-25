<?php

namespace App\Repositories;

use App\Models\Conv;

class ConvRepositories extends BaseRepositories
{
    public function newConv(int $user_A, int $user_B, string $chanel)
    {
        $this
            ->query("INSERT INTO conversation (user_a, user_b, chanel_name) VALUES (:user_a, :user_b, :chanel_name)")
            ->execute([
                'user_a' => $user_A,
                'user_b' => $user_B,
                'chanel_name' => $chanel
            ]);
    }
    public function getMyConv(string $user_A): array
    {
        $result = $this
            ->query("SELECT u.*, c.* FROM `conversation` c JOIN users u ON u.id = (
                            CASE
                                WHEN c.user_a = :user THEN c.user_b
                                ELSE c.user_a
                            END
                            )
                            WHERE c.user_a = :user OR c.user_b = :user")
            ->fetch([
                'user' => $user_A,
            ]);

        return $result;
    }
}