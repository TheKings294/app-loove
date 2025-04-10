<?php

namespace App\Controllers;

use App\Repositories\UserRespositories;

class UsersController extends BaseController {

    public function liste() {
        $repository = new UserRespositories();

        return $this->render('users/liste.php', [
            'users' => $repository->all()
        ]);
    }

    public function user(string $id) {
        $repository = new UserRespositories();

        return $this->render('users/specific.php', [
            'user' => $repository->get($id)
        ]);
    }
}