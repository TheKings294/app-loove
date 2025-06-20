<?php

use Monolog\Level;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\FirePHPHandler;

require __DIR__ . '/../../vendor/autoload.php';

$logger = new Logger('app');
$logger->pushHandler(new StreamHandler(__DIR__ . '/../'. 'log/app.log', Level::Debug));
$logger->pushHandler(new FirePHPHandler());

$controller = ['logger' => $logger];

return $controller;