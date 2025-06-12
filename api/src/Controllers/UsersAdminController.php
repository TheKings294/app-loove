<?php

namespace App\Controllers;

use App\Models\UserAdmin;
use App\Repositories\UserAdminRepositories;
use App\Utils\JWTFunctions;
use App\Utils\Functions;
use Monolog\Logger;

class UsersAdminController extends BaseController {
    private UserAdminRepositories $userAdminRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->userAdminRepo = new UserAdminRepositories();
    }
    public function login()
    {
        $email = !empty($_POST['email']) ? Functions::cleanCodeString($_POST['email']) : null;
        $password = !empty($_POST['password']) ? Functions::cleanCodeString($_POST['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return json_encode(['message' => 'Missing email or password']);
        }

        $user = new UserAdmin(0, $email, $password);

        $result = $this->userAdminRepo->getByName($user->username);

        if (is_string($result)) {
            http_response_code(406);
            return json_encode(['message' => 'Username not found']);
        }

        if (!password_verify($user->password, $result->password)) {
            http_response_code(401);
            return json_encode(['message' => 'Wrong password']);
        }

        $user->id = $result->id;

        $this->logger->info("User logged in [username => $user->username]");
        $jwt = JWTFunctions::createJWTToken($user->id, $user->username, "admin");
        $this->logger->info("Token created for an user [username => $user->username]");

        return json_encode(["token" => $jwt, "role" => "admin", 'id' => $user->id]);
    }

    public function new_users_admin()
    {
        $email = !empty($_POST['email']) ? Functions::cleanCodeString($_POST['email']) : null;
        $password = !empty($_POST['password']) ? Functions::cleanCodeString($_POST['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return "Missing Input";
        }
        $user = new UserAdmin(0, $email, password_hash($password, PASSWORD_DEFAULT));
        $password = null;

        $result = $this->userAdminRepo->getByName($user->username);

        if (!is_string($result)) {
            http_response_code(406);
            return json_encode(["success" => false, "message" => "Username already exists"]);
        }

        $this->userAdminRepo->new($user);
        $this->logger->info("New user [username => $user->username] created");

        http_response_code(200);
        return json_encode(["success" => true]);
    }

    public function get_users_admin()
    {
        return json_encode($this->userAdminRepo->all());
    }
    public function get_user_admin(string $id)
    {
        return json_encode($this->userAdminRepo->get($id));
    }
    public function edit_user_admin(string $id)
    {
        parse_str(file_get_contents("php://input"), $put_vars);

        $email = !empty($put_vars['email']) ? Functions::cleanCodeString($put_vars['email']) : null;
        $password = !empty($put_vars['password']) ? Functions::cleanCodeString($put_vars['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password])) {
            http_response_code(406);
            return json_encode(["message" => "All fields are required"]);
        }


        $user = new UserAdmin(intval($id), $email, password_hash($password, PASSWORD_DEFAULT));
        $password = null;

        $this->userAdminRepo->save($user);
        $this->logger->info("User [username => $user->username] updated");

        return json_encode(["success" => true]);
    }
    public function delete_user_admin(string $id)
    {
        $this->userAdminRepo->delete(intval($id));
        $this->logger->info("User [id => $id] deleted");
        http_response_code(200);
        return json_encode(['success' => true]);
    }
}