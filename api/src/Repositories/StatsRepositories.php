<?php

namespace App\Repositories;

class StatsRepositories extends BaseRepositories
{
    public function getGenderCount()
    {
        return $this
            ->query("SELECT gender, COUNT(*) AS 'count' FROM users GROUP BY gender")
            ->fetch();
    }
    public function getAverageSkills()
    {
        return $this
            ->query("SELECT AVG(soft_1) AS '1', AVG(soft_2) AS '2', AVG(soft3) AS '3', AVG(soft4) AS '4', 
        AVG(soft5) AS '5', AVG(soft6) AS '6', AVG(soft7) AS '7', AVG(soft8) AS '8', AVG(soft9) AS '9', AVG(soft10) AS '10' 
        FROM rank_soft_skills")
            ->fetch();
    }
    public function getCountUsers()
    {
        return $this
            ->query("SELECT COUNT(*) AS user_count FROM users")
            ->fetch();
    }
    public function getCountPremium()
    {
        return $this
            ->query("SELECT COUNT(*) AS user_premium FROM users WHERE is_premium = 1 AND end_premium_date > NOW()")
            ->fetch();
    }
    public function getAverageAge() {
        return $this
            ->query("SELECT AVG(TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE())) AS 'age' FROM users")
            ->fetch();
    }
}