<?php

namespace App\Repositories;

use App\Models\Report;
use App\Models\UserAdmin;
use App\Repositories\BaseRepositories;

class ReportsRepositories extends BaseRepositories {
    public function getAll()
    {
        $result = $this
            ->query("SELECT * FROM `report`")
            ->fetch();

        $data = [];
        foreach ($result as $item) {
            $data[] = new Report($item['id'], $item['user_reported'], $item['user'], $item['why_reported'], $item['images']);
        }

        return $data;
    }
    public function getById(int $id)
    {
        $result = $this
            ->query("SELECT * FROM `report` WHERE id = :id")
            ->fetch([
                'id' => $id,
            ]);

        if (!empty($result)) {
            return $result[0];
        }
        return $result;
    }
    public function add(Report $report): void
    {
        $this
            ->query("INSERT INTO `report` (user_reported, user, why_reported, images, date_of_creation, is_finish) 
                                VALUES (:ur, :u, :wr, :i, :doc, :if)")
            ->execute([
                'ur' => $report->user,
                'u' => $report->user,
                'wr' => $report->why_reported,
                'i' => $report->image,
                'doc' => $report->date,
                'if' => $report->is_finish
            ]);
    }
}