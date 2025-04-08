<?php

namespace App\Controllers;

use App\Repositories\UserModels;

class UsersController extends BaseController {

    public function liste() {
        $repository = new UserModels();

        return $this->render('users/liste.php', [
            'users' => $repository->all()
        ]);
    }

    public function user(string $id) {
        $repository = new UserModels();

        return $this->render('users/specific.php', [
            'user' => $repository->get($id)
        ]);
    }
}