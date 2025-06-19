<?php

namespace App\Controllers;

use App\Utils\Functions;
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
        $chanelName = Functions::getPrivateChannelName($user_A, $user_B);
        $this->convRepo->newConv($user_A, $user_B, $chanelName);
        return true;
    }
    public function getMyConvs(string $user_id)
    {
        $user_id = intval(Functions::cleanCodeString($user_id));
        return json_encode(['data' => $this->convRepo->getMyConv($user_id)]);
    }
}