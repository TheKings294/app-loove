<?php

namespace App\Repositories;

use App\Models\UserAdmin;
use App\Repositories\BaseRepositories;

class UserAdminRepositories extends BaseRepositories {

    public function get(string $identifier): UserAdmin | string {
        $result = $this
            ->query("SELECT * FROM users_admin WHERE id= :id")
            ->fetch(['id' => $identifier])
        ;

        if(empty($result)) {
            return "User with identifier $identifier does not exist";
        }
        
        return new UserAdmin($result[0]['id'], $result[0]['email'], $result[0]['password']);
    }

    public function getByName(string $username): UserAdmin | string {
        $result = $this
            ->query("SELECT * FROM users_admin WHERE email= :email")
            ->fetch(['email' => $username])
        ;

        if(empty($result)) {
            return "User with identifier $username does not exist";
        }

        return new UserAdmin($result[0]['id'], $result[0]['email'], $result[0]['password']);
    }

    public function all(): array {
        $results = $this
            ->query("SELECT * FROM users_admin")
            ->fetch();

        $users = [];
        foreach($results as $result) {
            $users[] = new UserAdmin($result['id'], $result['email'], $result['password']);
        }

        return $users;
    }

    public function save(UserAdmin $user): void {
        $this
            ->query("UPDATE users_admin SET email = :email, password = :password WHERE id = :id")
            ->execute([
                'email' => $user->username,
                'password' => $user->password,
                'id' => $user->id
            ]);
    }

    public function delete(int $id): void {
        $this
            ->query("DELETE FROM users_admin where id = :id")
            ->execute(['id'=>$id])
        ;
    }

    public function new(UserAdmin $userAdmin): void
    {
        $this
            ->query("INSERT INTO users_admin (email, password) VALUES(:email, :password)")
            ->execute([
                'email' => $userAdmin->username,
                'password' => $userAdmin->password
            ]);
    }
}