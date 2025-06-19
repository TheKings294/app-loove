<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Report;
use App\Utils\Functions;
use App\Repositories\ReportsRepositories;
use App\Utils\ImageFunctions;
use Monolog\Logger;

class ReportsController extends BaseController
{
    private ReportsRepositories $reportsRepo;
    public function __construct(Logger $logger)
    {
        parent::__construct($logger);
        $this->reportsRepo = new ReportsRepositories();
    }
    public function getAll()
    {
        return json_encode($this->reportsRepo->getAll());
    }
    public function getOne(string $id)
    {
        return json_encode($this->reportsRepo->getById(intval($id)));
    }
    public function newReport()
    {
        $user_reported = !empty($_POST['user_reported']) ? Functions::cleanCodeString($_POST['user_reported']) : null;
        $user = !empty($_POST['user']) ? Functions::cleanCodeString($_POST['user']) : null;
        $why_reported = !empty($_POST['why_reported']) ? Functions::cleanCodeString($_POST['why_reported']) : null;

        if (!Functions::checkIfIsNotNull([$user_reported, $user, $why_reported]) || !$_FILES['image']['name'])
        {
            http_response_code(406);
            return json_encode(['message' => "All fields are required."]);
        }

        $imageName = uniqid() . $_FILES['image']['name'];

        ImageFunctions::MoveImage($_FILES['image']['tmp_name'],$imageName);

        $report = new Report(0, $user_reported, $user, $why_reported, $imageName, new \DateTime(),false);

        $this->reportsRepo->add($report);

        return json_encode(['success' => true, 'message' => "Report added."]);
    }
    public function markAsFinished(string $id)
    {
        $this->reportsRepo->markFinished(intval($id));
        return json_encode(['success' => true, 'message' => "Report marked as finished."]);
    }
}