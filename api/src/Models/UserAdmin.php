<?php

namespace App\Models;

class UserAdmin
{
    public function __construct(
        public int $id,
        public string $username,
        public string $password,
    ){}
}