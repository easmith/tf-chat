<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseManager.php';

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '../Entity/Message.php';

class MessageManager extends BaseManager
{
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
	
	public function getCounters($uid)
	{

		$keys = array("from" => 1);

		$initial = array("items" => 0);

		$reduce = "function (obj, prev) { prev.items++; }";
		
		$condition = array("to" => $uid);

		$gr = $this->db->{$this->entity}->group($keys, $initial, $reduce, $condition);
		
		$result = array();
		foreach(is_array($gr['retval']) ? $gr['retval'] : array() as $g)
		{
			$result[$g['from']] = $g['items'];
		}
		
		return $result;
	}
}