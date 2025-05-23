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
            ->query("SELECT * FROM users LEFT JOIN rank_soft_skills rss on users.id = rss.user_id")
            ->fetch();

        $data = [];

        foreach ($result as $user) {
            $data[] = [
                new User(0, $user['first_name'], $user['last_name'], new \DateTime($user['date_of_birth']),
                    $user['gender'],$user['email'], $user['password'],$user['city'], $user['description'], $user['image'],
                    $user['gender_attraction'], $user['age_attraction'], $user['relation_type'],$user['is_verified'],
                    $user['is_suspended'], $user['is_ban'], $user['is_delete'], $user['is_premium'], new \DateTime($user['end_suspended_date'])),
                new SoftSkill(0, $user['user_id'], $user['soft_1'], $user['soft_2'], $user['soft3'],
                    $user['soft4'], $user['soft5'], $user['soft6'], $user['soft7'], $user['soft8'],
                    $user['soft9'], $user['soft10'])
            ];
        }
        return $data;
    }
    public function getById(int $id): array
    {
        $result = $this
            ->query("SELECT * FROM users WHERE id = :id")
            ->fetch([
                'id' => $id,
            ]);

        $result = $result[0];
        return [
            new User($result['id'], $result['first_name'], $result['last_name'], new \DateTime($result['date_of_birth']),
            $result['gender'], $result['email'], $result['password'], $result['city'], $result['description'], $result['image'],
            $result['gender_attraction'], $result['age_attraction'], $result['relation_type'], $result['is_verified'],
            $result['is_suspended'], $result['is_ban'], $result['is_delete'], $result['is_premium'], $result['end_suspended_date']),
            new SoftSkill($result['rss.id'], $result['id'], $result['soft_1'], $result['soft_2'], $result['soft_3'],
                $result['soft_4'], $result['soft_5'], $result['soft_6'], $result['soft_7'], $result['soft_8'],
                $result['soft_9'], $result['soft_10'])
        ];
    }
    public function getByEmail(string $email): array | null
    {
        $result = $this
            ->query("SELECT `id`, `password` FROM users WHERE email = :email")
            ->fetch([
                'email' => $email,
            ]);

        if (empty($result)) {
            return null;
        }
        return [$result[0]['id'], $result[0]['password']];
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
    public function setPremium(int $id): void
    {
        $this
            ->query("UPDATE users SET is_premium = 1 WHERE id = :id")
            ->execute([
                'id' => $id,
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

        return $result ? $result['id'] : 0;
    }
}