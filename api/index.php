<?php
$allowed_origins = [
    "https://admin.clink.test",
    "https://clink.test",
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTION");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

if (preg_match('#^/uploads/(.+)$#', $_SERVER['REQUEST_URI'], $matches)) {
    $filePath = __DIR__ . $_SERVER['REQUEST_URI'];
    if (file_exists($filePath) && is_file($filePath)) {
        $mimeType = mime_content_type($filePath);
        header("Content-Type: $mimeType");
        readfile($filePath);
        exit();
    } else {
        http_response_code(404);
        echo "Fichier non trouvé.";
        exit();
    }
}

use App\Controllers\{
    StatsController,
    UsersAdminController,
    ReportsController,
    UsersController,
    HomeController,
    ConvController,
    LikeController,
    MessageController};
use App\Core\Routeur;
use App\Kernel;

require __DIR__ .'/vendor/autoload.php';
require __DIR__ .'/src/Constant.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$routeur = new Routeur();

$routeur->addRoute(['GET'], '/', HomeController::class , 'status', 'none');

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
$routeur->addRoute(['POST'], '/reports/new', ReportsController::class, 'newReport', 'users');
$routeur->addRoute(['POST'], '/reports/finish/{id}', ReportsController::class, 'markAsFinished', 'admin');

//Routes for users
$routeur->addRoute(['GET'], '/users', UsersController::class, 'getAll', 'admin');
$routeur->addRoute(['GET'], '/users/{id}', UsersController::class, 'getOne', 'users');
$routeur->addRoute(['POST'], '/users/new', UsersController::class, 'newUser', 'none');
$routeur->addRoute(['PUT'], '/users/edit/{id}', UsersController::class, 'updateUser', 'users');
$routeur->addRoute(['PATCH'], '/users/edit/password/{id}', UsersController::class, 'updatePassword', 'users');
$routeur->addRoute(['DELETE'], '/users/delete/{id}', UsersController::class, 'deleteUser', 'users');
$routeur->addRoute(['PATCH'], '/users/premium/{id}/{end-date}', UsersController::class, 'premiumUser', 'users');
$routeur->addRoute(['PATCH'], '/users/ban/{id}', UsersController::class, 'banUser', 'admin');
$routeur->addRoute(['PATCH'], '/users/validate/{id}/{code}', UsersController::class, 'validateUser', 'none');
$routeur->addRoute(['PATCH'], '/users/suspended/{id}/{end_date}', UsersController::class, 'suspendUser', 'admin');
$routeur->addRoute(['GET'], '/users/compatible/{x}/{y}/{id}', UsersController::class, 'getUsersCompatible', 'users');
$routeur->addRoute(['POST'], '/users/login', UsersController::class, 'loginUser', 'none');
$routeur->addRoute(['GET'], '/users/stats/premium', UsersController::class, 'getPremiumUser', 'admin');

//Routes for like and un_like
$routeur->addRoute(['GET'], '/like/{id}/{idLiked}', LikeController::class, 'LikeAnUser', 'users');
$routeur->addRoute(['GET'], '/unlike/{id}/{idUnLiked}', LikeController::class, 'setUnlike', 'users');
$routeur->addRoute(['GET'], '/like/{id}', LikeController::class, 'getLikeME', 'users');
$routeur->addRoute(['GET'], '/unlike/{id}', LikeController::class, 'getUnlikeME', 'users');

//Conv and messages
$routeur->addRoute(['GET'], '/conv/{id}', ConvController::class, 'getMyConvs', 'users');
$routeur->addRoute(['POST'], '/pusher/auth', MessageController::class, 'pusherAuth', 'users');
$routeur->addRoute(['POST'], '/message/new/{idA}/{idB}/{convID}', MessageController::class, 'sendMessage', 'users');
$routeur->addRoute(['GET'], '/messages/{convID}', MessageController::class, 'getAllMessagesOfConv', 'users');

//Stats
$routeur->addRoute(['GET'], '/stats', StatsController::class, 'getAllStats', 'admin');
$routeur->addRoute(['GET'], '/stats/paypal', StatsController::class, 'gatPaypalStats', 'admin');

new Kernel($routeur);