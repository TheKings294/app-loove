<?php

namespace App\Controllers;

use App\Models\UserAdmin;
use App\Repositories\UserAdminRepositories;
use App\Utils\Functions;

class UsersAdminController extends BaseController {
    public function login()
    {
        $usrRepo = new UserAdminRepositories();

        $email = !empty($_POST['email']) ? Functions::cleanCodeString($_POST['email']) : null;
        $password = !empty($_POST['password']) ? Functions::cleanCodeString($_POST['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return "Missing Input";
        }

        $user = new UserAdmin(0, $email, $password);

        $reult = $usrRepo->getByName($user->username);

        if (is_string($reult)) {
            http_response_code(406);
            return "Username not found";
        }

        if (!password_verify($user->password, $reult->password)) {
            http_response_code(401);
            return "Wrong password";
        }

        $user->id = $reult->id;

        $this->logger->info("User logged in [username => $user->username]");

        $jwt = Functions::createJWTToken($user->id, $user->username);

        $_SESSION['authenticated'] = true;
        $_SESSION['jwt-token'] = $jwt;
        $_SESSION["username"] = $user->username;
        $_SESSION["user_id"] = $user->id;

        $this->logger->info("Token created for an user [username => $user->username]");

        return json_encode(["token" => $jwt]);
    }
}