<?php

namespace App\Core;

class Response {

    public function __construct(
        private int $code, 
        private string $body
    ) {}

    public function getCode() : int {
        return $this->code;
    }

    public function getBody() : string {
        return $this->body;
    }
    public function setCode(int $code) {
        $this->code = $code;
    }
    public function setBody(string $body) {
        $this->body = $body;
    }
}