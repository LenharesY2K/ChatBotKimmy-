<?php

class HomeController {
    public function index() {
        require '../app/views/home/index.html';
    }

    public function getStarted() {
        require '../app/views/home/getStarted.html';
    }

    public function login (){
        require '../app/views/home/login.php';
        }
}
