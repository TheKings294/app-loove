<?php

namespace App\Repositories;

class ValidateRepositories extends BaseRepositories {
    public function getCode(int $id)
    {
        return $this
            ->query("SELECT code FROM verification_code WHERE user_id = :id")
            ->fetch([
                'id' => $id,
            ]);
    }
    public function setVerifCode(int $code, int $id) :void
    {
        $this
            ->query('INSERT INTO `verification_code` (`user_id`, `code`) VALUES (:id, :code)')
            ->execute([
                'id' => $id,
                'code' => $code
            ]);
    }
}