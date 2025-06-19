<?php

namespace App\Models;

use DateTime;

class Report {
    public function __construct(
        public int $id,
        public string $user_reported,
        public string $user,
        public string $why_reported,
        public string $image,
        public DateTime $date,
        public bool $is_finish,
    ) {}
}