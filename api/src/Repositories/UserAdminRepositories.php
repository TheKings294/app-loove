<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\UserAdmin;
use App\Repositories\BaseRepositories;
use Exception;

class UserAdminRepositories extends BaseRepositories {

    public function get(string $identifier): UserAdmin | string {
        $result = $this
            ->query("SELECT * FROM users_admin WHERE id= :id")
            ->fetch(['id' => $identifier])
        ;

        if(empty($result)) {
            return "User with identifier $identifier does not exist";
        }
        
        return new UserAdmin($result['id'], $result['email'], $result['password']);
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
            ->query("SELECT * FROM users")
            ->fetch();

        $users = [];
        foreach($results as $result) {
            $users[] = new UserAdmin($result['id'], $result['email'], $result['password']);
        }

        return $users;
    }

    public function save(User $user): void {
        $this
            ->query("UPDATE users SET nom = :nom, prenom = :prenom, age = :age, localisation = :localisation WHERE id = :id")
            ->execute([
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'age' => $user->age,
                'localisation' => $user->localisation,
                'id' => $user->id
            ]);
    }

    public function delete(User $user): void {
        $this
            ->query("DELETE FROM users where id = :id")
            ->execute(['id'=>$user->id])
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