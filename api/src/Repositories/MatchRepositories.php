<?php

namespace App\Repositories;

class MatchRepositories extends BaseRepositories
{
    public function newMatch(int $user_A, int $user_B): void
    {
        $this
            ->query("INSERT INTO matches (user_a, user_b) VALUES (:user_A, :user_B)")
            ->execute([
                "user_A" => $user_A,
                "user_B" => $user_B
            ]);
    }
}