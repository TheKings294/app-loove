<?php

namespace App\Faker;

use Faker\Provider\Base;
use Faker\Generator;
class VilleReelleProvider extends Base {
    protected $city;

    public function __construct(Generator $generator)
    {
        parent::__construct($generator);

        $chemin = __DIR__ . '/ville-france.json';
        $donnees = json_decode(file_get_contents($chemin), true);

        $this->city = array_map(function ($commune) {
            return ucwords(strtolower($commune['Nom_commune']));
        }, $donnees);
    }

    public function villeReelle()
    {
        return $this->city[array_rand($this->city)];
    }
}
