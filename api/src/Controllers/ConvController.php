<?php

namespace App\Controllers;

use Monolog\Logger;
use App\Repositories\ConvRepositories;

class ConvController extends BaseController
{
    private ConvRepositories $convRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->convRepo = new ConvRepositories();
    }
    public function newConv(int $user_A, int $user_B): bool
    {
        $this->convRepo->newConv($user_A, $user_B);
        return true;
    }
}