<?php

namespace App\Repositories;

use App\Models\SoftSkill;
use App\Repositories\BaseRepositories;

class SkillRepositories extends BaseRepositories
{
    public function setSkill(SoftSkill $skill): void
    {
        $this
            ->query("INSERT INTO rank_soft_skills (user_id,soft_1,soft_2,soft3,soft4,soft5,soft6,soft7,soft8,soft9,soft10) 
                            VALUES(:user_id, :skill1, :skill2, :skill3, :skill4, :skill5, :skill6, :skill7, :skill8, :skill9, :skill10)")
            ->execute([
                'user_id' => $skill->userId,
                'skill1' => $skill->skill1,
                'skill2' => $skill->skill2,
                'skill3' => $skill->skill3,
                'skill4' => $skill->skill4,
                'skill5' => $skill->skill5,
                'skill6' => $skill->skill6,
                'skill7' => $skill->skill7,
                'skill8' => $skill->skill8,
                'skill9' => $skill->skill9,
                'skill10' => $skill->skill10,
            ]);
    }
    public function updateSkill(SoftSkill $skill): void
    {
        $this
            ->query("UPDATE rank_soft_skills SET soft_1 = :skill1, soft_2 = :skill2, soft3 = :skill3, soft4 = :skill4, soft5 = :skill5,
                            soft6 = :skill6, soft7 = :skill7, soft8 = :skill8, soft9 = :skill9, soft10 = :skill10
                            WHERE user_id = :user_id;")
            ->execute([
                'user_id' => $skill->userId,
                'skill1' => $skill->skill1,
                'skill2' => $skill->skill2,
                'skill3' => $skill->skill3,
                'skill4' => $skill->skill4,
                'skill5' => $skill->skill5,
                'skill6' => $skill->skill6,
                'skill7' => $skill->skill7,
                'skill8' => $skill->skill8,
                'skill9' => $skill->skill9,
                'skill10' => $skill->skill10,
            ]);
    }
}