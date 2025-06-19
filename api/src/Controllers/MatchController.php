<?php

namespace App\Controllers;

use Monolog\Logger;
use App\Repositories\MatchRepositories;

class MatchController extends BaseController
{
    private MatchRepositories $matchRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->matchRepo = new MatchRepositories();
    }
    public function newMatch(int $userIdA, int $userIdB): bool
    {
        $this->matchRepo->newMatch($userIdA, $userIdB);

        return true;
    }
}