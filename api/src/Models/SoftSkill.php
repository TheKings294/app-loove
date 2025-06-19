<?php

namespace App\Models;

class SoftSkill
{
    public function __construct(
        public int $id,
        public int $userId,
        public int $skill1,
        public int $skill2,
        public int $skill3,
        public int $skill4,
        public int $skill5,
        public int $skill6,
        public int $skill7,
        public int $skill8,
        public int $skill9,
        public int $skill10,
    ){}
}