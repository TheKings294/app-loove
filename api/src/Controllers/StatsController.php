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
        $decodedResult = json_decode($result, true);

        $total = 0;

        foreach ($decodedResult['transaction_details'] as $transaction)
        {
            $info = $transaction['transaction_info'];
            if ($info['transaction_event_code'] === 'T0006') {
                $total += $info['transaction_amount']['value'];
            }
        }

        $json = [
          "gender" => $this->statsRepo->getGenderCount(),
           "soft" => $this->statsRepo->getAverageSkills(),
           "age" => $this->statsRepo->getAverageAge(),
           "user" => $this->statsRepo->getCountUsers(),
           "premium" => $this->statsRepo->getCountPremium(),
            "transaction" => $total
        ];
        return json_encode($json);
    }
    public function gatPaypalStats()
    {
        $startDate = new \DateTime("first day of this month");
        $startDate->setTime(0, 0, 0);

        $endDate = new \DateTime("last day of this month");
        $endDate->setTime(23, 59, 59);

        $result = $this->paypalMiddelware->getTransactions($startDate, $endDate);
        $decodedResult = json_decode($result, true);

        $totalPerWeek = [];

        foreach ($decodedResult['transaction_details'] as $transaction) {
            $info = $transaction['transaction_info'];

            if ($info['transaction_event_code'] === 'T0006') {
                $date = new \DateTime($info['transaction_initiation_date']);

                $weekNum = $date->format('W');

                $totalPerWeek[$weekNum] = ($totalPerWeek[$weekNum] ?? 0) + $info['transaction_amount']['value'];
            }
        }

        return json_encode($totalPerWeek);
    }
}