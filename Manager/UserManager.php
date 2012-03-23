<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseManager.php';

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '../Entity/User.php';

class UserManager extends BaseManager
{
	
	public function __construct()
	{
		parent::__construct();
	}

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
		return parent::getAll('user');
	}

	public function test()
	{
		return iterator_to_array($this->db->user->find(array(), array('id', 'fName', 'lName', 'sex')));
	}
}


$u = new UserManager();

print_r($u->test());
