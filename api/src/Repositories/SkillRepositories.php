<?php

namespace App\Repositories;

use App\Models\SoftSkill;
use App\Repositories\BaseRepositories;

class SkillRepositories extends BaseRepositories
{
    public function setSkill(SoftSkill $skill): void
    {
        $this
            ->query("INSERT INTO skills (user_id,skill1,skill2,skill3,skill4,skill5,skill6,skill7,skill8,skill9,skill10) 
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
            ->query("UPDATE skills SET skill1 = :skill1,skill2 = :skill2,skill3 = :skill3,skill4 = :skill4,skill5 = :skill5,
                            skill6 = :skill6,skill7 = :skill7,skill8 = :skill8,skill9 = :skill9,skill10 = :skill10
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