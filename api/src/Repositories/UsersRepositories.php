<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories;
use App\Models\User;

class UsersRepositories extends BaseRepositories
{
    public function getAll(): array
    {
        $result = $this
            ->query("SELECT * FROM users")
            ->fetch();

        $data = [];

        foreach ($result as $user) {
            $data[] = new User($user['id'], $user['first_name'], $user['last_name'], $user['date_of_birth'],
                $user['gender'],$user['email'], $user['password'],$user['city'], $user['description'], $user['image'],
                $user['gender_attraction'], $user['age_attraction'], $user['relation_type'],$user['is_verified'],
                $user['is_suspended'], $user['is_ban'], $user['is_delete'], $user['is_premium'], $user['end_suspended_date']);
        }
        return $data;
    }
    public function getById(int $id)
    {
        $result = $this
            ->query("SELECT * FROM users WHERE id = :id")
            ->fetch([
                'id' => $id,
            ]);

        $result = $result[0];
        return new User($result['id'], $result['first_name'], $result['last_name'], $result['date_of_birth'],
            $result['gender'], $result['email'], $result['password'], $result['city'], $result['description'], $result['image'],
            $result['gender_attraction'], $result['age_attraction'], $result['relation_type'], $result['is_verified'],
            $result['is_suspended'], $result['is_ban'], $result['is_delete'], $result['is_premium'], $result['end_suspended_date']);
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
                'date_of_birth' => $user->birthday,
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
            ->query("UPDATE users SET is_suspended = 1 AND end_suspended_date = :date WHERE id = :id")
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
        $this
            ->query("UPDATE `users` SET first_name = :first_name, last_name = :last_name, 
                   date_of_birth = :date_of_birth, gender = :gender, email = :email, city = :city, 
                   description = :description, image = :image, gender_attraction = :gender_attraction, 
                   age_attraction = :age_attraction, relation_type = :relation_type WHERE id = :id")
            ->execute([
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'date_of_birth' => $user->birthday,
                'gender' => $user->gender,
                'email' => $user->email,
                'city' => $user->city,
                'description' => $user->description,
                'image' => $user->image_url,
                'gender_attraction' => $user->gender_attraction,
                'age_attraction' => $user->age_attraction,
                'relation_type' => $user->relation_type,
                'id' => $user->id,
            ]);
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
}