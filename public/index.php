<?php
require_once '../app/core/Route.php';

$url = $_SERVER['REQUEST_URI'];
Router::route($url);