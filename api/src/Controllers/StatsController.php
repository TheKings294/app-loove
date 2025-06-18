<?php

namespace App\Controllers;

use App\Middelware\PaypalMiddelware;
use App\Repositories\StatsRepositories;
use Monolog\Logger;

class StatsController extends BaseController
{
    private PaypalMiddelware $paypalMiddelware;
    private StatsRepositories $statsRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->paypalMiddelware = new PaypalMiddelware();
        $this->statsRepo = new StatsRepositories();
    }
    public function getAllStats()
    {

    }
    public function gatPaypalStats()
    {

    }
}