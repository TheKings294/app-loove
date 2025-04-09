<?php

namespace App\Core;

class Request {

    public string $uri;
    public string $method;
    public array $query;
    public array $request;

    public function __construct($server, $get, $post) {
        $this->uri = $server['REQUEST_URI'];
        $this->method = $server['REQUEST_METHOD'];
        $this->query = $get;
        $this->request = $post;
    }
}