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
//Routes for users admin
$routeur->addRoute(['POST'], '/login-admin', UsersAdminController::class, 'login', 'none');
$routeur->addRoute(['POST'], '/users-admin/new', UsersAdminController::class, 'new_users_admin', 'admin');
$routeur->addRoute(['GET'], '/users-admin', UsersAdminController::class, 'get_users_admin', 'admin');
$routeur->addRoute(['GET'], '/user-admin/{id}', UsersAdminController::class, 'get_user_admin', 'admin');
$routeur->addRoute(['PUT'], '/users-admin/edit/{id}', UsersAdminController::class, 'edit_user_admin', 'admin');
$routeur->addRoute(['DELETE'], '/users-admin/delete/{id}', UsersAdminController::class, 'delete_user_admin', 'admin');

new Kernel($routeur);