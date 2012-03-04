<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseManager.php';

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '../Entity/Message.php';

class MessageManager extends BaseManager
{
	/**
	 * Возвращает пользователя по id
	 *
	 * @param string $id имя пользователя
	 *
	 * @return User
	 */
	public function get($userId)
	{
		return parent::get($id, 'Message');
	}

	public function getPair($ownerId, $senderId)
	{
		$messages = parent::getAll('Message');
		$haystack = array($ownerId.$senderId, $senderId.$ownerId);

		$result = array();
		foreach ($messages as $h => $m)
		{
			if (in_array($m->from.$m->to, $haystack))
			{
				$result[$h] = $m;
			}
		}
		return $result;
	}

	public function getAll()
	{
		return parent::getAll('Message');
	}
}