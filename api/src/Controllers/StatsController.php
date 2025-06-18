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
        $this->paypalMiddelware = new PaypalMiddelware('https://api-m.sandbox.paypal.com');
        $this->statsRepo = new StatsRepositories();
        $this->paypalMiddelware->token();
    }
    public function getAllStats()
    {
        $startDate = new \DateTime('first day of this month');
        $startDate->setTime(0, 0, 0);

        $endDate = new \DateTime('last day of this month');
        $endDate->setTime(23, 59, 59);

        $result = $this->paypalMiddelware->getTransactions($startDate, $endDate);

        $json = [
          "gender" => $this->statsRepo->getGenderCount(),
           "soft" => $this->statsRepo->getAverageSkills(),
           "age" => $this->statsRepo->getAverageAge(),
           "user" => $this->statsRepo->getCountUsers(),
           "premium" => $this->statsRepo->getCountPremium(),
        ];
        return json_encode($json);
    }
    public function gatPaypalStats()
    {

    }
}