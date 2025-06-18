<?php

namespace App\Middelware;

use GuzzleHttp\Exception\GuzzleException;

class PaypalMiddelware extends BaseMiddelware {
    private string $token;
    private string $appID;
    private string $expireIn;
    private string $nonce;
    public function token() :bool | string
    {
        try {
            $reponse = $this->client->request('POST', '/v1/oauth2/token', [
                'headers' => [
                    "Content-Type: application/x-www-form-urlencoded"
                ],
                'form_params' => [
                    'grant_type' => 'client_credentials',
                ],
                'auth' => [$this->clientId, $this->clientSecret]
            ]);

            $content = $reponse->getBody();
            $this->token = json_decode($content)->access_token;
            $this->appID = json_decode($content)->app_id;
            $this->expireIn = json_decode($content)->expires_in;
            $this->nonce = json_decode($content)->nonce;

            return true;
        } catch (GuzzleException $e) {
            return $e->getMessage();
        }
    }
    public function getTransactions(\DateTime $start, \DateTime $end) :string
    {
        try {
            $response = $this->client->request('GET', "/v1/reporting/transactions?start_date={$start->format('Y-m-d\TH:i:sO')}Z&end_date={$end->format('Y-m-d\TH:i:sO')}Z&currency_code=EUR", [
                'headers' => [
                    "Authorization" => "Bearer {$this->token}",
                    "Content-Type" => "application/json"
                ],
            ]);

            return $this->token;
        } catch (GuzzleException $e) {
            return $e->getMessage();
        }
    }
}