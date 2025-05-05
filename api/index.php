<?php
session_start();

use App\Controllers\{UsersAdminController, ReportsController, UsersController};
use App\Core\Routeur;
use App\Kernel;

require __DIR__ .'/vendor/autoload.php';
require __DIR__ .'/src/Constant.php';

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

//Routes for report
$routeur->addRoute(['GET'], '/reports', ReportsController::class, 'getAll', 'admin');
$routeur->addRoute(['GET'], '/reports/{id}', ReportsController::class, 'getOne', 'admin');
$routeur->addRoute(['POST'], '/reports/new', ReportsController::class, 'new_report', 'users');
$routeur->addRoute(['POST'], '/reports/finish/{id}', ReportsController::class, 'finish_report', 'admin');

//Routes for users
$routeur->addRoute(['GET'], '/users', UsersController::class, 'getAll', 'admin');
$routeur->addRoute(['GET'], '/users/{id}', UsersController::class, 'getOne', 'admin');
$routeur->addRoute(['POST'], '/users/new/{id}', UsersController::class, 'newUser', 'none');
$routeur->addRoute(['PUT'], '/users/edit/{id}', UsersController::class, 'updateUser', 'none');
$routeur->addRoute(['DELETE'], '/users/delete/{id}', UsersController::class, 'deleteUser', 'users');
$routeur->addRoute(['PATCH'], '/users/premium/{id}', UsersController::class, 'premiumUser', 'users');
$routeur->addRoute(['PATCH'], '/users/ban/{id}', UsersController::class, 'banUser', 'admin');
$routeur->addRoute(['PATCH'], '/users/validate/{id}', UsersController::class, 'validateUser', 'admin');
$routeur->addRoute(['GET'], '/users/compatible/{x}/{y}', UsersController::class, 'getUsersCompatible', 'users');

new Kernel($routeur);