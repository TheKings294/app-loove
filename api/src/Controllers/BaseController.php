<?php 

namespace App\Controllers;

use App\Core\Request;
use Monolog\Logger;

abstract class BaseController {
    
    protected Request $request;
    protected Logger $logger;

    public function __construct(Logger $logger) {
        $this->logger = $logger;
    }

    public function setRequest(Request $request) {
        $this->request = $request;
    }

    protected function getRequest() : Request {
        return $this->request;
    }
}