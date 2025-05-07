<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use App\Utils\ImageFunctions;
use Monolog\Logger;
use App\Repositories\UsersRepositories;
use App\Utils\Functions;
use App\Utils\JWTFunctions;
use Notihnio\MultipartFormDataParser;

class UsersController extends BaseController
{
    private UsersRepositories $userRepo;
    private array $inputFields = ["firstName", "lastName", "dateOfBirth", "gender", "email", "password", "city",
        "description", "image", "genderAttraction", "ageAttraction", "relationType", "isVerified", "isSuspended",
        "isBan", "isDeleted", "isPremium", "endSuspendedDate"];
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->userRepo = new UsersRepositories();
    }
    public function getAll()
    {
        http_response_code(200);
        return json_encode($this->userRepo->getAll());
    }
    public function getOne(string $id)
    {
        http_response_code(200);
        return json_encode($this->userRepo->getById(intval($id)));
    }
    public function newUser()
    {
        $data = [];
        for ($i = 0; $i < 12; $i++) {
            if ($this->inputFields[$i] !== 'image') {
                $data[$this->inputFields[$i]] = Functions::cleanCodeString($_POST[$this->inputFields[$i]]) ?? null;
            }
        }
        if (!Functions::checkIfIsNotNull($data) || !$_FILES['image']['name'])
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $result = $this->userRepo->getByEmail($data['email']);

        if (!is_null($result)) {
            http_response_code(400);
            return json_encode(['message' => "User already exists."]);
        }

        if (!Functions::isValidDOB($data['dateOfBirth']))
        {
            http_response_code(400);
            return json_encode(['message' => "Invalid date of birth."]);
        }

        $data['password'] = password_hash($_POST["password"], PASSWORD_DEFAULT);

        $imageName = uniqid() . $_FILES['image']['name'];

        ImageFunctions::MoveImage($_FILES['image']['tmp_name'],$imageName);

        $data['image'] = $imageName;

        $user = new User(0, $data['firstName'], $data['lastName'], new \DateTime($data['dateOfBirth']), $data['gender'],
            $data['email'], $data['password'], $data['city'], $data['description'], $data['image'],
            $data['genderAttraction'], $data['ageAttraction'], $data['relationType'], false,
            false, false, false, false, new \DateTime());

        $this->userRepo->new($user);

        $this->logger->info("Users created [username => $user->email]");

        return json_encode(["success" => true, 'message' => 'User created']);
    }
    public function updateUser(string $id)
    {
        $request = MultipartFormDataParser\MultipartFormDataParser::parse();
        $data = [];
        for ($i = 0; $i < 12; $i++) {
            if ($this->inputFields[$i] !== "image" && $this->inputFields[$i] !== 'password')
            {
                $data[$this->inputFields[$i]] = Functions::cleanCodeString($request->params[$this->inputFields[$i]]) ?? null;
            }
        }

        if (!Functions::checkIfIsNotNull($data))
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $image = $this->userRepo->getImage(intval($id));

        var_dump($image);

        $data['image'] = null;
        if (!empty($request->files)) {
            if (!empty($image)) {
                ImageFunctions::DeleteImage($image);
            }
            $imageName = uniqid() . $request->files['image']['name'];
            ImageFunctions::moveFileByCopy($request->files['image']['tmp_name'], $imageName);
            $data['image'] = $imageName;
        }

        $user = new User($id, $data['firstName'], $data['lastName'], new \DateTime($data['dateOfBirth']), $data['gender'],
            $data['email'], '', $data['city'], $data['description'], $data['image'],
            $data['genderAttraction'], $data['ageAttraction'], $data['relationType'], false,
            false, false, false, false, new \DateTime());

        $this->userRepo->update($user);

        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User updated']);
    }
    public function updatePassword(string $id)
    {
        $request = MultipartFormDataParser\MultipartFormDataParser::parse();
        $pass = !empty($request->params['password']) ? password_hash($request->params["password"], PASSWORD_DEFAULT) : null;

        if (!Functions::checkIfIsNotNull([$pass])) {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $this->userRepo->updatePassword(intval($id), $pass);

        http_response_code(200);
        return json_encode(['success' => true, 'message' => 'User password updated']);
    }
    public function deleteUser(string $id)
    {
        $this->userRepo->setDelete(intval($id));
        http_response_code(200);
        return json_encode(["success" => true, "message" => "User deleted"]);
    }
    public function suspendUser(string $id, string $end_date)
    {
        $this->userRepo->setSuspended(intval($id), $end_date);
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User suspended']);
    }
    public function premiumUser(string $id)
    {
        $this->userRepo->setPremium(intval($id));
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User passed to premium']);
    }
    public function banUser(string $id)
    {
        $this->userRepo->setBan(intval($id));
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User banned']);
    }
    public function validateUser(string $id)
    {
        $this->userRepo->setValidate(intval($id));
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User validated']);
    }
    public function getUsersCompatible(string $x, string $y)
    {

    }
    public function loginUser()
    {
        $email = !empty($_POST['email']) ? Functions::cleanCodeString($_POST['email']) : null;
        $password = !empty($_POST['password']) ? Functions::cleanCodeString($_POST['password']) : null;

        if (!Functions::checkIfIsNotNull([$email, $password]))
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $user = $this->userRepo->getByEmail($email);
        if (!$user)
        {
            http_response_code(406);
            return json_encode(['message' => "This user does not exist"]);
        }

        if (!password_verify($password, $user[1]))
        {
            http_response_code(401);
            return json_encode(['message' => "Wrong password"]);
        }

        $token = JWTFunctions::createJWTToken(intval($user[0]), $email, 'users');

        $_SESSION['authenticated'] = true;
        $_SESSION['jwt-token'] = $token;
        $_SESSION["username"] = $email;
        $_SESSION["user_id"] = $user[0];
        $_SESSION["role"] = "users";

        $this->logger->info("Users login success [username => $email]");
        $this->logger->info("Token created for an users [username => $email]");

        http_response_code(200);
        return json_encode(['token' => $token]);
    }
}