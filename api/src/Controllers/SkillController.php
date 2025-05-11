<?php

namespace App\Controllers;

use App\Repositories\SkillRepositories;
use Monolog\Logger;
use App\Models\SoftSkill;

class SkillController extends BaseController
{
    private SkillRepositories $skillRepo;

    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->skillRepo = new SkillRepositories();
    }

    public function setSkill(SoftSkill $skill): bool
    {
        $this->skillRepo->setSkill($skill);
        return true;
    }
    public function updateSkill(SoftSkill $skill): bool
    {
        $this->skillRepo->updateSkill($skill);
        return true;
    }
}