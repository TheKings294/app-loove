<?php

namespace App\Models;

class User {
    public function __construct(
        public string $id,
        public string $first_name,
        public string $last_name,
        public int $age,
        public string $localisation,
    ){}
}