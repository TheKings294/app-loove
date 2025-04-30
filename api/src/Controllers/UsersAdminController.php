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

    public function new_users_admin()
    {
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

    public function get_users_admin()
    {
        $usrRepo = new UserAdminRepositories();
        return json_encode($usrRepo->all());
    }
    public function get_user_admin(string $id)
    {
        $usrRepo = new UserAdminRepositories();
        return json_encode($usrRepo->get($id));
    }
    public function edit_user_admin(string $id)
    {
        $usrRepo = new UserAdminRepositories();

        parse_str(file_get_contents("php://input"), $put_vars);

        $email = !empty($put_vars['email']) ? Functions::cleanCodeString($put_vars['email']) : null;
        $password = !empty($put_vars['password']) ? Functions::cleanCodeString($put_vars['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return json_encode(["message" => "All fields are required"]);
        }


        $user = new UserAdmin(intval($id), $email, password_hash($password, PASSWORD_DEFAULT));
        $password = null;

        $usrRepo->save($user);
        $this->logger->info("User [username => $user->username] updated");

        return json_encode(["success" => true]);
    }
    public function delete_user_admin(string $id)
    {
        $usrRepo = new UserAdminRepositories();
        $usrRepo->delete(intval($id));
        $this->logger->info("User [id => $id] deleted");
        http_response_code(200);
        return json_encode(['success' => true]);
    }
}