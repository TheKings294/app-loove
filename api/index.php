<?php
session_start();

use App\Controllers\{UsersAdminController};
use App\Core\Routeur;
use App\Kernel;

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$routeur = new Routeur();
$routeur->addRoute(['POST'], '/login-admin', UsersAdminController::class, 'login');

new Kernel($routeur);