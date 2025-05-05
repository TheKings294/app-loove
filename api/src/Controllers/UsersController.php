<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use App\Utils\ImageFunctions;
use Monolog\Logger;
use App\Repositories\UsersRepositories;
use App\Utils\Functions;

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
        return json_encode($this->userRepo->getAll());
    }
    public function getOne(string $id)
    {
        return json_encode($this->userRepo->getById(intval($id)));
    }
    public function newUser()
    {
        $data = [];
        for ($i = 0; $i < 12; $i++) {
            if ($i !== 'image') {
                $data[$i] = Functions::cleanCodeString($_POST[$i]) ?? null;
            }
        }

        if (!Functions::checkIfIsNotNull($data) || !$_FILES['image']['name'])
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $data['password'] = password_hash($_POST["password"], PASSWORD_DEFAULT);

        $imageName = uniqid() . $_FILES['image']['name'] . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

        ImageFunctions::MoveImage($_FILES['image']['tmp_name'],$imageName);

        $data['image'] = $imageName;

        $user = new User(0, $data['firstName'], $data['lastName'], $data['dateOfBirth'], $data['gender'],
            $data['email'], $data['password'], $data['city'], $data['description'], $data['image'],
            $data['genderAttraction'], $data['ageAttraction'], $data['relationType'], false,
            false, false, false, false, new \DateTime());

        $this->userRepo->new($user);
        return json_encode(["success" => true, 'message' => 'User created']);
    }
    public function updateUser(string $id)
    {
        $data = [];
        for ($i = 0; $i < 12; $i++) {
            if ($i !== 'image' || $i !== 'password') {
                $data[$i] = Functions::cleanCodeString($_POST[$i]) ?? null;
            }
        }

        if (!Functions::checkIfIsNotNull($data))
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $imageName = uniqid() . $_FILES['image']['name'] . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

        ImageFunctions::MoveImage($_FILES['image']['tmp_name'],$imageName);

        $data['image'] = $imageName;

        $user = new User(0, $data['firstName'], $data['lastName'], $data['dateOfBirth'], $data['gender'],
            $data['email'], null, $data['city'], $data['description'], $data['image'],
            $data['genderAttraction'], $data['ageAttraction'], $data['relationType'], false,
            false, false, false, false, new \DateTime());

        $this->userRepo->update($user);

        return json_encode(["success" => true, 'message' => 'User updated']);
    }
    public function updatePassword(string $id)
    {
        $pass = !empty($_POST['password']) ? password_hash($_POST["password"], PASSWORD_DEFAULT) : null;

        if (!Functions::checkIfIsNotNull([$pass])) {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $this->userRepo->updatePassword();

        return json_encode(['success' => true, 'message' => 'User password updated']);
    }
    public function deleteUser(string $id)
    {
        $this->userRepo->setDelete(intval($id));
        return json_encode(["success" => true, "message" => "User deleted"]);
    }
    public function suspendUser(string $id, string $end_date)
    {
        $suspendUntil = (new \DateTime($end_date))->modify("+$end_date seconds")->format('Y-m-d H:i:s');
        $this->userRepo->setSuspended(intval($id), $suspendUntil);
        return json_encode(["success" => true, 'message' => 'User suspended']);
    }
    public function premiumUser(string $id)
    {
        $this->userRepo->setPremium(intval($id));
        return json_encode(["success" => true, 'message' => 'User passed to premium']);
    }
    public function banUser(string $id)
    {
        $this->userRepo->setBan(intval($id));
        return json_encode(["success" => true, 'message' => 'User banned']);
    }
    public function validateUser(string $id)
    {
        $this->userRepo->setValidate(intval($id));
        return json_encode(["success" => true, 'message' => 'User validated']);
    }
    public function getUsersCompatible(string $x, string $y)
    {

    }
}