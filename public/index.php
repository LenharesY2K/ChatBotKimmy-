<?php
require_once '/../app/core/router.php';

$url = $_SERVER['REQUEST_URI'];
Router::route($url);