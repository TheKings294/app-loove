<?php
/**
 * @var PDO $pdo
 */

require './vendor/autoload.php';

use Dotenv\Dotenv;
use Faker\Factory;
use App\Faker\VilleReelleProvider;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$faker = Faker\Factory::create('fr_FR');
$faker->addProvider(new VilleReelleProvider($faker));

$dsn = "mysql:host=".$_ENV["DB_URL_FIXTURE"].";dbname=".$_ENV["DB_NAME"].";charset=utf8";
try {
    $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
} catch (PDOException $e) {
    echo $e->getMessage();
    exit();
}

$password = '$2y$10$cA7TvijT64dhxsfsJgAuL.OGd0p07jvFtdC4TEzfX2Z5S.jKXQ1Da';

$stmtUser = $pdo->prepare('INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password, city, 
                   description, image, gender_attraction, age_attraction, relation_type) 
                                VALUES(:first_name, :last_name, :date_of_birth, :gender, :email, :password, :city, 
                                       :description, :image, :gender_attraction, :age_attraction, :relation_type)');
$stmtRank = $pdo->prepare('INSERT INTO rank_soft_skills (user_id,soft_1,soft_2,soft3,soft4,soft5,soft6,soft7,soft8,soft9,soft10) 
                            VALUES(:user_id, :skill1, :skill2, :skill3, :skill4, :skill5, :skill6, :skill7, :skill8, :skill9, :skill10)');

for ($i = 0; $i < 100; $i++) {
    try {
        $stmtUser->bindValue(':first_name', $faker->firstName, PDO::PARAM_STR);
        $stmtUser->bindValue(':last_name', $faker->lastName, PDO::PARAM_STR);
        $stmtUser->bindValue(':date_of_birth', $faker->dateTimeBetween('-100 years', '-18 years')->format('Y-m-d'));
        $stmtUser->bindValue(':gender', $faker->randomElement(['man', 'woman', 'other']), PDO::PARAM_STR);
        $stmtUser->bindValue(':email', $faker->email, PDO::PARAM_STR);
        $stmtUser->bindValue(':password', $password, PDO::PARAM_STR);
        $stmtUser->bindValue(':city', $faker->villeReelle, PDO::PARAM_STR);
        $stmtUser->bindValue(':description', $faker->text, PDO::PARAM_STR);
        $stmtUser->bindValue(':image', $faker->imageUrl, PDO::PARAM_STR);
        $stmtUser->bindValue(':gender_attraction', $faker->randomElement(['man', 'woman', 'other']), PDO::PARAM_STR);
        $stmtUser->bindValue(':age_attraction', $faker->numberBetween(18, 100), PDO::PARAM_STR);
        $stmtUser->bindValue(':relation_type', $faker->randomElement(['serious', 'short', 'chill', 'hookup', 'friends']), PDO::PARAM_STR);
        $stmtUser->execute();
        $result  = $pdo->lastInsertId();
        $stmtRank->bindValue(':user_id', $result, PDO::PARAM_INT);
        $stmtRank->bindValue(':skill1', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill2', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill3', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill4', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill5', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill6', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill7', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill8', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill9', $faker->numberBetween(0, 5));
        $stmtRank->bindValue(':skill10', $faker->numberBetween(0, 5));
        $stmtRank->execute();
    } catch (Exception $e) {
        echo $e->getMessage(), $e->getLine();
        exit();
    }
}