<?php 

namespace App\Core;

use Exception;
use Monolog\Logger;
use ReflectionClass;
use App\Controllers\BaseController;
use App\Utils\Functions;


class Routeur {
    private Logger $logger;

    public function __construct(
        private array $routes = []
    ) {
        $container = require_once __DIR__ . '/../utils/Services.php';
        $this->logger = $container['logger'];
    }

    public function addRoute(string|array $methods, string $path, string $controller, string $action, string $role)
    {
        if (is_string($methods)) {
            $methods = [$methods];
        }

        $this->routes[] = new Route($path, $controller, $action, $role, $methods);
    }

    public function request(Request $request): Response 
    {
        $response = new Response(404, "Route not found");

        $token = Functions::checkInBearerToken();

        /** @var Route $route */
        foreach($this->routes as $route) {
            if ($route->isValidFor($request)) {
                $checkToken = $this->checkAuthorization($route, $token);
                if (is_array($checkToken)) {
                    $response->setCode(http_response_code($checkToken['code']));
                    $response->setBody($checkToken['message']);
                }
                $reflected_controller = new ReflectionClass($route->getController());

                $exploded_uri = explode('/', trim($request->uri));
                $indexes = $this->indexOfParams($route->getPath());
                $params = array_filter($exploded_uri, function($v, $k) use ($indexes) {
                    return in_array($k, $indexes, true);
                }, ARRAY_FILTER_USE_BOTH);

                /** @var BaseController $controller */
                $controller = $reflected_controller->newInstance($this->logger);
                $controller->setRequest($request);

                try {
                    $response = new Response(200, call_user_func_array (
                        [$controller, $route->getAction()], 
                        $params
                    ));
                } catch(Exception $e) {
                    $response = new Response(404, $e->getMessage());
                }
            }
        }
    
        return $response;
    }

    private function indexOfParams(string $path) : array 
    {
        $exploded_path = explode('/', trim($path));
        $indexes = [];

        foreach($exploded_path as $key => $value) {
            if(str_contains($value, '{') && str_contains($value, '}')) {
                $indexes[] = $key;
            }
        }
        return $indexes;
    }
    private function checkAuthorization(Route $route, string | bool $token): bool | array
    {
        if ($route->getRole() !== 'none' && !is_string($token)) {
            return ['code' => 401,'message' => 'Token not provided' ];
        } elseif (is_string($token)) {
            if ($_SESSION['role'] === Functions::decodeJWTToken($token)['role'] &&
                Functions::decodeJWTToken($token)['role'] === $route->getRole()) {
                return ['code' => 403, 'message' => 'You don\'t have permission to access this route'];
            }
        }

        return true;
    }
}