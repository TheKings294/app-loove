<?php

namespace App\Repositories;

use App\Models\Report;
use App\Models\UserAdmin;
use App\Repositories\BaseRepositories;

class ReportsRepositories extends BaseRepositories {
    public function getAll()
    {
        $result = $this
            ->query("SELECT * FROM `report` WHERE is_finish = 0")
            ->fetch();

        $data = [];
        foreach ($result as $item) {
            $data[] = new Report($item['id'], $item['user_reported'], $item['user'], $item['why_reported'], $item['images'], new \DateTime($item['date_of_creation']), $item['is_finish']);
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
            ->query("INSERT INTO `report` (user_reported, user, why_reported, images, date_of_creation) 
                                VALUES (:ur, :u, :wr, :i, :doc)")
            ->execute([
                'ur' => $report->user,
                'u' => $report->user,
                'wr' => $report->why_reported,
                'i' => $report->image,
                'doc' => $report->date->format('Y-m-d'),
            ]);
    }
    public function markFinished(int $id): void
    {
        $this
            ->query("UPDATE `report` SET is_finish = 1 WHERE id = :id")
            ->execute([
                'id' => $id,
            ]);
    }
}