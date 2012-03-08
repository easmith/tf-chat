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

	public function getMessages($ownerId, $senderId)
	{
		$messages = parent::getAll('Message');
		$haystack = array($ownerId.$senderId, $senderId.$ownerId);

		$result = array();
		foreach ($messages as $h => &$m)
		{
			if (in_array($m->from.$m->to, $haystack))
			{
				$result[$h] = $m;
				if ($m->to == $ownerId && $m->status == 0)
				{
					$m->status = 1;
					$m->lastModifed = time();
				}
			}
		}
		$this->saveAll($messages, 'Message');
		return $result;
	}

	public function getEvents($ownerId, $senderId)
	{
		$messages = parent::getAll('Message');
		$haystack = array($ownerId.$senderId, $senderId.$ownerId);

		$result = array('messages' => array(), 'counters' => array());
		foreach ($messages as $h => &$m)
		{
			// сообщения за последние 5 секунд
			if (in_array($m->from.$m->to, $haystack) && ($m->lastModifed > (time() - 5) || $m->status == 0) )
			{
				$result['messages'][$h] = $m;
//				if ($m->status == 0 && $m->to == $ownerId)
//					$m->lastModifed = time();
			}
			elseif ($m->to == $ownerId && $m->status == 0) {
				$result['counters'][$m->from] = !isset($result['counters'][$m->from]) ? 1 : $result['counters'][$m->from] + 1;
			}
		}

		$this->saveAll($messages, 'Message');
		return $result;
	}

	public function getAll()
	{
		return parent::getAll('Message');
	}

	public function sendMessage($from, $to, $type, $content)
	{
		$m = new Message();
		$m->from = $from;
		$m->to = $to;
		$m->type = $type;
		$m->content = $content;
		$m->status = 0;
		return $this->save($m);
	}
	
	public function remove($mId)
	{
		return parent::remove($mId, 'Message');
	}
}