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

        $result = $usrRepo->getByName($user->username);

        if (is_string($result)) {
            http_response_code(406);
            return "Username not found";
        }

        if (!password_verify($user->password, $result->password)) {
            http_response_code(401);
            return "Wrong password";
        }

        $user->id = $result->id;

        $this->logger->info("User logged in [username => $user->username]");

        $jwt = Functions::createJWTToken($user->id, $user->username, "admin");

        $_SESSION['authenticated'] = true;
        $_SESSION['jwt-token'] = $jwt;
        $_SESSION["username"] = $user->username;
        $_SESSION["user_id"] = $user->id;
        $_SESSION["role"] = "admin";

        $this->logger->info("Token created for an user [username => $user->username]");

        return json_encode(["token" => $jwt]);
    }

    public function new_users_admin() {
        $usrRepo = new UserAdminRepositories();

        $email = !empty($_POST['email']) ? Functions::cleanCodeString($_POST['email']) : null;
        $password = !empty($_POST['password']) ? Functions::cleanCodeString($_POST['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return "Missing Input";
        }
        $user = new UserAdmin(0, $email, password_hash($password, PASSWORD_DEFAULT));
        $password = null;

        $result = $usrRepo->getByName($user->username);

        if (!is_string($result)) {
            http_response_code(406);
            return "Username already exists";
        }

        $usrRepo->new($user);
        $this->logger->info("New user [username => $user->username] created");

        http_response_code(200);
        return json_encode(["success" => true]);
    }
}