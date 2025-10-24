<?php

class HomeController
{
    public function index()
    {
        require __DIR__ .  '../app/views/home/index.php';
    }

    public function getStarted()
    {
        require __DIR__ . '/../views/home/getStarted.php';
    }
}
