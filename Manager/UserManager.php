<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseManager.php';

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '../Entity/User.php';

class UserManager extends BaseManager
{
	/**
	 * Возвращает пользователя по id
	 *
	 * @param string $id
	 *
	 * @return User
	 */
	public function get($id)
	{
		return parent::get($id, 'User');
	}

	public function getAll()
	{
		return parent::getAll('User');
	}

	/**
	 * Генерируем абсолютно нереального пользователя
	 */
	public function genRand()
	{
		$u = new User();

		$fName = array(array("Света", "Катя", "Лена", "Марина", "Оля", "Наташа", "Настя", "Юля", "Аня"),
				array("Андрей", "Евгений", "Валера", "Семен", "Павел", "Максим", "Артур", "Алексей", "Александр"));

		$lName = array("Иванов", "Петров", "Сидров", "Путин", "Медведев", "Зюганов", "Прохоров");

		$city = array("Москва", "Санкт-Петербург", "Сочи", "Самара", "Нижний-новгород", "Казань", "Екатеринбург", "Киев");
		$country = array("Россия", "Украина", "Беларусь", "Казахстан");

		$u->age = rand(18, 75);
		$u->sex = rand(0, 1);
		$u->fName = $fName[$u->sex][rand(0, count($fName[$u->sex]) - 1)];
		$u->lName = $lName[rand(0, count($lName) - 1)] . ($u->sex == 0 ? 'а' : '');
		$u->city = $city[rand(0, count($city) - 1)];
		$u->country = $country[rand(0, count($country) - 1)];
		$u->online = rand(0, 1);
		return $u;
	}

	public function getRand()
	{
		$all = $this->getAll();
		return $all[rand(0, count($all) - 1)];
	}
}