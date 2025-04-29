<?php
session_start();

use App\Controllers\{UsersAdminController};
use App\Core\Routeur;
use App\Kernel;
use App\Utils\Functions;

require __DIR__ .'/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$routeur = new Routeur();
$routeur->addRoute(['POST'], '/login-admin', UsersAdminController::class, 'login', 'none');
$routeur->addRoute(['POST'], '/new-admin', UsersAdminController::class, 'new_users_admin', 'admin');

new Kernel($routeur);