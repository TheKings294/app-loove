<?php

namespace App\Middelware;

use GuzzleHttp\Client;

class BaseMiddelware {
    protected Client $client;
    protected string $clientId;
    protected string $clientSecret;
    public function __construct($baseUrl)
    {
        $this->client = new Client([
            'base_uri' => $baseUrl,
        ]);
        $this->clientId = $_ENV['PAYPAL_CLIENT_ID'];
        $this->clientSecret = $_ENV['PAYPAL_KEY'];
    }
}