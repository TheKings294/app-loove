<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\SoftSkill;
use App\Models\User;
use App\Utils\ImageFunctions;
use Monolog\Logger;
use App\Repositories\UsersRepositories;
use App\Utils\Functions;
use App\Utils\JWTFunctions;
use Notihnio\MultipartFormDataParser;
use League\Geotools\Coordinate\Coordinate;
use League\Geotools\Distance\Distance;

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
        $softRepo = new SkillController($this->logger);
        $data = [];
        $softData = [];
        for ($i = 0; $i < 12; $i++) {
            if ($this->inputFields[$i] !== 'image') {
                $data[$this->inputFields[$i]] = Functions::cleanCodeString($_POST[$this->inputFields[$i]]) ?? null;
            }
        }
        for ($i = 1; $i <= 10; $i++) {
            $softData['soft_' . $i] = Functions::cleanCodeString($_POST['soft_' . $i]) ?? null;
        }
        if (!Functions::checkIfIsNotNull($data) || !$_FILES['image']['name'])
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }
        if (!Functions::checkIfIsNotNull($softData))
        {
            http_response_code(406);
            return json_encode(['message' => "All skills are required."]);
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
        $user_id = $this->userRepo->getLastId();
        if ($user_id === 0) {
            http_response_code(400);
            return json_encode(['message' => "Unable to create user."]);
        }
        $soft = new SoftSkill(0, $user_id, $softData['soft_1'], $softData['soft_2'], $softData['soft_3'],
            $softData['soft_4'], $softData['soft_5'], $softData['soft_6'], $softData['soft_7'], $softData['soft_8'],
            $softData['soft_9'], $softData['soft_10'],);

        $softRepo->setSkill($soft);

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

        $data['image'] = null;
        if (!empty($request->files)) {
            if (!empty($image)) {
                ImageFunctions::DeleteImage($image);
            }
            $imageName = uniqid() . $request->files['image']['name'];
            ImageFunctions::moveFileByCopy($request->files['image']['tmp_name'], $imageName);
            $data['image'] = $imageName;
        }

        $user = new User(intval($id), $data['firstName'], $data['lastName'], new \DateTime($data['dateOfBirth']), $data['gender'],
            $data['email'], '', $data['city'], $data['description'], $data['image'],
            $data['genderAttraction'], $data['ageAttraction'], $data['relationType'], false,
            false, false, false, false, new \DateTime());

        $this->userRepo->update($user);

        $this->logger->info("Users updated [username => $user->email]");

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
        $this->logger->info("Users deleted [username => $id]");
        http_response_code(200);
        return json_encode(["success" => true, "message" => "User deleted"]);
    }
    public function suspendUser(string $id, string $end_date)
    {
        $dateobj = new \DateTime($end_date);
        $this->userRepo->setSuspended(intval($id), $dateobj->format("Y-m-d"));
        $this->logger->info("Users suspended [username => $id] until $end_date");
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User suspended']);
    }
    public function premiumUser(string $id)
    {
        $this->userRepo->setPremium(intval($id));
        $this->logger->info("Users premium [username => $id]");
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User passed to premium']);
    }
    public function banUser(string $id)
    {
        $this->userRepo->setBan(intval($id));
        $this->logger->info("Users ban [username => $id]");
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User banned']);
    }
    public function validateUser(string $id)
    {
        $this->userRepo->setValidate(intval($id));
        http_response_code(200);
        return json_encode(["success" => true, 'message' => 'User validated']);
    }
    public function getUsersCompatible(string $x, string $y, string $id)
    {
        $user = $this->userRepo->getById(intval($id));
        $cityOfUser = $this->userRepo->getCityFrance($user[0]->city);
        if (empty($x) || empty($y)) {
            $x = $cityOfUser[0]['ville_longitude_deg'];
            $y = $cityOfUser[0]['ville_latitude_deg'];
        }
        $coorOfCityUser = new \Geotools\Coordinate\Coordinate([(int) $x, (int) $y]);

        $result = $this->userRepo->getUsersCompatible(intval($id));
        $compatibleUsers = [];

        foreach ($result as $user) {
            $city = $this->userRepo->getCityFrance($user[0]->city);
            $coorCity = new \Geotools\Coordinate\Coordinate([(int) $city[0]['ville_longitude_deg'], (int) $city[0]['ville_latitude_deg']]);

            $distance = new \Geotools\Distance\Distance();
            if ($distance->setFrom($coorOfCityUser)->setTo($coorCity)->in('km')->haversine() < 20) {
                $compatibleUsers[] = $user;
            }
        }

        return json_encode($compatibleUsers);
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
        $this->logger->info("Users login success [username => $email]");
        $this->logger->info("Token created for an users [username => $email]");

        http_response_code(200);
        return json_encode(['token' => $token, 'id' => $user[0]]);
    }
}