<?php

namespace App\Repositories;

use App\Models\SoftSkill;
use App\Repositories\BaseRepositories;
use App\Models\User;

class UsersRepositories extends BaseRepositories
{
    public function getAll(): array
    {
        $result = $this
            ->query("SELECT 
              u.id AS user_id,
              u.first_name,
              u.last_name,
              u.date_of_birth,
              u.gender,
              u.email,
              u.password,
              u.city,
              u.description,
              u.image,
              u.gender_attraction,
              u.age_attraction,
              u.relation_type,
              u.is_verified,
              u.is_suspended,
              u.is_ban,
              u.is_delete,
              u.is_premium,
              u.end_suspended_date,
            
              r.id AS rank_id,
              r.soft_1,
              r.soft_2,
              r.soft3,
              r.soft4,
              r.soft5,
              r.soft6,
              r.soft7,
              r.soft8,
              r.soft9,
              r.soft10
            
            FROM users u
            LEFT JOIN rank_soft_skills r ON u.id = r.user_id")
            ->fetch();

        $data = [];

        foreach ($result as $user) {
            $data[] = [
                new User($user['user_id'], $user['first_name'], $user['last_name'], new \DateTime($user['date_of_birth']),
                    $user['gender'], $user['email'], $user['password'], $user['city'], $user['description'], $user['image'],
                    $user['gender_attraction'], $user['age_attraction'], $user['relation_type'], $user['is_verified'],
                    $user['is_suspended'], $user['is_ban'], $user['is_delete'], $user['is_premium'], $user['end_suspended_date'] ? new \DateTime($user['end_suspended_date']) : null),
                new SoftSkill($user['rank_id'], $user['user_id'], $user['soft_1'], $user['soft_2'], $user['soft3'],
                    $user['soft4'], $user['soft5'], $user['soft6'], $user['soft7'], $user['soft8'],
                    $user['soft9'], $user['soft10'])
            ];
        }
        return $data;
    }
    public function getById(int $id): array
    {
        $result = $this
            ->query("SELECT 
              u.id AS user_id,
              u.first_name,
              u.last_name,
              u.date_of_birth,
              u.gender,
              u.email,
              u.password,
              u.city,
              u.description,
              u.image,
              u.gender_attraction,
              u.age_attraction,
              u.relation_type,
              u.is_verified,
              u.is_suspended,
              u.is_ban,
              u.is_delete,
              u.is_premium,
              u.end_suspended_date,
            
              r.id AS rank_id,
              r.soft_1,
              r.soft_2,
              r.soft3,
              r.soft4,
              r.soft5,
              r.soft6,
              r.soft7,
              r.soft8,
              r.soft9,
              r.soft10
            
            FROM users u
            LEFT JOIN rank_soft_skills r ON u.id = r.user_id
            WHERE u.id = :id")
            ->fetch([
                'id' => $id,
            ]);

        $result = $result[0];
        return [
            new User($result['user_id'], $result['first_name'], $result['last_name'], new \DateTime($result['date_of_birth']),
            $result['gender'], $result['email'], $result['password'], $result['city'], $result['description'], $result['image'],
            $result['gender_attraction'], $result['age_attraction'], $result['relation_type'], $result['is_verified'],
            $result['is_suspended'], $result['is_ban'], $result['is_delete'], $result['is_premium'], $result['end_suspended_date'] ? new \DateTime($result['end_suspended_date']) : null),
            new SoftSkill($result['rank_id'], $result['user_id'], $result['soft_1'], $result['soft_2'], $result['soft3'],
                $result['soft4'], $result['soft5'], $result['soft6'], $result['soft7'], $result['soft8'],
                $result['soft9'], $result['soft10'])
        ];
    }
    public function getByEmail(string $email): array | null
    {
        $result = $this
            ->query("SELECT `id`, `password`, `is_verified` FROM users WHERE email = :email")
            ->fetch([
                'email' => $email,
            ]);

        if (empty($result)) {
            return null;
        }
        return [$result[0]['id'], $result[0]['password'], $result[0]['is_verified']];
    }
    public function new(User $user): void
    {
        $this
            ->query("INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password, city, 
                   description, image, gender_attraction, age_attraction, relation_type) 
                                VALUES(:first_name, :last_name, :date_of_birth, :gender, :email, :password, :city, 
                                       :description, :image, :gender_attraction, :age_attraction, :relation_type)")
            ->execute([
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'date_of_birth' => $user->birthday->format('Y-m-d'),
                'gender' => $user->gender,
                'email' => $user->email,
                'password' => $user->password,
                'city' => $user->city,
                'description' => $user->description,
                'image' => $user->image_url,
                'gender_attraction' => $user->gender_attraction,
                'age_attraction' => $user->age_attraction,
                'relation_type' => $user->relation_type,
            ]);
    }
    public function setDelete(int $id): void
    {
        $this
            ->query("UPDATE users SET is_delete = 1 WHERE id = :id")
            ->execute([
                'id' => $id,
            ]);
    }
    public function setSuspended(int $id, string $endSuspended): void
    {
        $this
            ->query("UPDATE users SET is_suspended = true, end_suspended_date = :date WHERE id = :id")
            ->execute([
                'id' => $id,
                'date' => $endSuspended,
            ]);
    }
    public function setBan(int $id): void
    {
        $this
            ->query("UPDATE users SET is_ban = 1 WHERE id = :id")
            ->execute([
                'id' => $id,
            ]);
    }
    public function setValidate(int $id): void
    {
        $this
            ->query("UPDATE users SET is_verified = 1 WHERE id = :id")
            ->execute([
                'id' => $id,
            ]);
    }
    public function setPremium(int $id, string $date): void
    {
        $this
            ->query("UPDATE users SET is_premium = 1 AND SET end_premium_date = :date WHERE id = :id")
            ->execute([
                'id' => $id,
                'date' => $date,
            ]);
    }
    public function update(User $user): void
    {
        $query = "UPDATE `users` SET first_name = :first_name, last_name = :last_name, 
                   date_of_birth = :date_of_birth, gender = :gender, email = :email, city = :city, 
                   description = :description, gender_attraction = :gender_attraction, 
                   age_attraction = :age_attraction, relation_type = :relation_type";

        if ($user->image_url !== null) {
            $query .= ", image = :image";
        }
        $query .= " WHERE id = :id";

        $params = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'date_of_birth' => $user->birthday->format('Y-m-d'),
            'gender' => $user->gender,
            'email' => $user->email,
            'city' => $user->city,
            'description' => $user->description,
            'gender_attraction' => $user->gender_attraction,
            'age_attraction' => $user->age_attraction,
            'relation_type' => $user->relation_type,
            'id' => $user->id,
        ];

        if ($user->image_url !== null) {
            $params['image'] = $user->image_url;
        }

        $this
            ->query($query)
            ->execute($params);
    }
    public function updatePassword(int $id, string $password): void
    {
        $this
            ->query("UPDATE users SET password = :password WHERE id = :id")
            ->execute([
                'password' => $password,
                'id' => $id,
            ]);
    }
    public function getImage(int $id): string
    {
        $result = $this
        ->query("SELECT image FROM users WHERE id = :id")
        ->fetch([
            'id' => $id,
        ]);

        return $result ? $result[0]['image'] : "";
    }
    public function getLastId(): int
    {
        $result = $this
            ->query("SELECT id FROM users ORDER BY id DESC LIMIT 1")
            ->fetch();

        return $result ? $result[0]['id'] : 0;
    }
    public function getUsersCompatible(int $id): array
    {
        $result = $this
            ->query("SELECT u.*, r.*
        FROM users u
         JOIN rank_soft_skills r ON r.user_id = u.id
         JOIN rank_soft_skills me_r ON me_r.user_id = :id
         JOIN users me ON me.id = :id
        WHERE u.id != :id
          AND TIMESTAMPDIFF(YEAR, u.date_of_birth, CURDATE()) BETWEEN (me.age_attraction - 2) AND (me.age_attraction + 2)
          AND u.gender = me.gender_attraction
          
          AND u.id NOT IN (
              SELECT user_unlike
              FROM un_like
              WHERE user = :id
            )
          AND u.id NOT IN (
            SELECT user_liked
            FROM `like`
            WHERE user = :id
          )  
            
          AND (
            (me_r.soft_1 = 5 AND r.soft_1 BETWEEN 4 AND 5) OR (me_r.soft_1 < 5 AND r.soft_1 BETWEEN me_r.soft_1 - 1 AND me_r.soft_1 + 1)
            )
          AND (
            (me_r.soft_2 = 5 AND r.soft_2 BETWEEN 4 AND 5) OR (me_r.soft_2 < 5 AND r.soft_2 BETWEEN me_r.soft_2 - 1 AND me_r.soft_2 + 1)
            )
          AND (
            (me_r.soft3 = 5 AND r.soft3 BETWEEN 4 AND 5) OR (me_r.soft3 < 5 AND r.soft3 BETWEEN me_r.soft3 - 1 AND me_r.soft3 + 1)
            )
          AND (
            (me_r.soft4 = 5 AND r.soft4 BETWEEN 4 AND 5) OR (me_r.soft4 < 5 AND r.soft4 BETWEEN me_r.soft4 - 1 AND me_r.soft4 + 1)
            )
          AND (
            (me_r.soft5 = 5 AND r.soft5 BETWEEN 4 AND 5) OR (me_r.soft5 < 5 AND r.soft5 BETWEEN me_r.soft5 - 1 AND me_r.soft5 + 1)
            )
          AND (
            (me_r.soft6 = 5 AND r.soft6 BETWEEN 4 AND 5) OR (me_r.soft6 < 5 AND r.soft6 BETWEEN me_r.soft6 - 1 AND me_r.soft6 + 1)
            )
          AND (
            (me_r.soft7 = 5 AND r.soft7 BETWEEN 4 AND 5) OR (me_r.soft7 < 5 AND r.soft7 BETWEEN me_r.soft7 - 1 AND me_r.soft7 + 1)
            )
          AND (
            (me_r.soft8 = 5 AND r.soft8 BETWEEN 4 AND 5) OR (me_r.soft8 < 5 AND r.soft8 BETWEEN me_r.soft8 - 1 AND me_r.soft8 + 1)
            )
          AND (
            (me_r.soft9 = 5 AND r.soft9 BETWEEN 4 AND 5) OR (me_r.soft9 < 5 AND r.soft9 BETWEEN me_r.soft9 - 1 AND me_r.soft9 + 1)
            )
          AND (
            (me_r.soft10 = 5 AND r.soft10 BETWEEN 4 AND 5) OR (me_r.soft10 < 5 AND r.soft10 BETWEEN me_r.soft10 - 1 AND me_r.soft10 + 1)
            );")
            ->fetch([
                'id' => $id
            ]);

        $data = [];
        foreach ($result as $user) {
            $data[] = [
                new User(0, $user['first_name'], $user['last_name'], new \DateTime($user['date_of_birth']),
                    $user['gender'],$user['email'], $user['password'],$user['city'], $user['description'], $user['image'],
                    $user['gender_attraction'], $user['age_attraction'], $user['relation_type'],$user['is_verified'],
                    $user['is_suspended'], $user['is_ban'], $user['is_delete'], $user['is_premium'], $user['end_suspended_date'] ? new \DateTime($user['end_suspended_date']) : null),
                new SoftSkill(0, $user['user_id'], $user['soft_1'], $user['soft_2'], $user['soft3'],
                    $user['soft4'], $user['soft5'], $user['soft6'], $user['soft7'], $user['soft8'],
                    $user['soft9'], $user['soft10'])
            ];
        }

        return $data;
    }
    public function getCityFrance(string $city)
    {
        return $this
            ->query('SELECT * FROM `villes_france_free` WHERE LOWER(ville_slug) LIKE LOWER(:search)')
            ->fetch([
                'search' => $city
            ]);
    }
    public function setVerifCode(int $id, int $code) :void
    {
        $this
            ->query('INSERT INTO `verification_code` (`user_id`, `code`) VALUES (:id, :code)')
            ->fetch([
                'id' => $id,
                'code' => $code
            ]);
    }
}