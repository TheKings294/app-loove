<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\UserAdmin;
use App\Repositories\BaseRepositories;
use Exception;

class UserAdminRepositories extends BaseRepositories {

    public function get(string $identifier): UserAdmin {
        $result = $this
            ->query("SELECT * FROM users WHERE id= :id")
            ->fetch(['id' => $identifier])
        ;

        if(empty($result)) {
            throw new Exception("User with identifier $identifier does not exist");
        }
        
        return new User($result['id'], $result['nom'], $result['prenom'], $result['age'], $result['localisation']);
    }

    public function getByName(string $username): UserAdmin {
        $result = $this
            ->query("SELECT * FROM users WHERE email= :email")
            ->fetch(['id' => $username])
        ;

        if(empty($result)) {
            throw new Exception("User with identifier $username does not exist");
        }

        return new UserAdmin($result['id'], $result['email'], $result['password']);
    }

    public function all(): array {
        $results = $this
            ->query("SELECT * FROM users")
            ->fetch();

        $users = [];
        foreach($results as $result) {
            $users[] = new User($result['id'], $result['nom'], $result['prenom'], $result['age'], $result['localisation']);
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
}