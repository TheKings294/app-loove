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
            return [ucwords(strtolower($commune['Nom_commune'])), $commune['Code_postal']];
        }, $donnees);
    }

    public function villeReelle(int $dep)
    {
        $prefix = str_pad($dep, 2, '0', STR_PAD_LEFT);
        $min = (int)($prefix . '000');
        $max = (int)($prefix . '999');

        $villesFiltre = array_filter($this->city, function ($ville) use ($min, $max) {
            $code = (int)$ville[1];
            return $code >= $min && $code <= $max;
        });

        return $villesFiltre[array_rand($villesFiltre)][0];
    }
}
