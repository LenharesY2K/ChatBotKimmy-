<?php

class UserController
{

    public function login()
    {
        require '../app/views/user/login.php';
    }

    public function cadastrarUser()
    {
        require '../app/view/user/cadastrar.php';
    }
}
