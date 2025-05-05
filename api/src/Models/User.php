<?php

namespace App\Models;

use DateTime;

class User {
    public function __construct(
        public string $id,
        public string $first_name,
        public string $last_name,
        public DateTime $birthday,
        public string $gender,
        public string $email,
        public string $password,
        public string $city,
        public string $description,
        public string $image_url,
        public string $gender_attraction,
        public string $age_attraction,
        public string $relation_type,
        public bool $is_verified,
        public bool $is_suspended,
        public bool $is_ban,
        public bool $is_deleted,
        public bool $is_premium,
        public DateTime $en_suspended_date
    ){}
}