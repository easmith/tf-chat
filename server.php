<?
error_reporting(E_ALL);
ini_set("display_error", 1);

header("Content-type: text/plain; charset=utf-8");

include_once './Manager/MessageManager.php';
include_once './Manager/UserManager.php';

$mm = new MessageManager();
$um = new UserManager();

$cmd = @$_GET['cmd'];
$result = "";
switch ($cmd)
{
	case 'getUserList' : {
		$result = json_encode($um->get());
		break;
	}
	
	case 'getCounters' : {
		$uid = $_GET['uid'];
		$result = json_encode($mm->getCounters($uid));
		break;
	}
	
	case 'getMessage' :
	{
		$ownerId = $_GET['ownerId'];
		$senderId = $_GET['senderId'];
		$mdbIn = array('$in'=> array($senderId, $ownerId));
		$result = json_encode($mm->get(array('from' => $mdbIn, 'to' => $mdbIn)));
		break;
	}
	case 'sendMessage' :
	{
		$from = $_GET['from'];
		$to = $_GET['to'];
		$type = $_POST['type'];
		$content = $_POST['content'];

		$m = $mm->sendMessage($from, $to, $type, $content);
		$result = json_encode($m );
		break;
	}
	case 'removeMessage' :
	{
		$mId = $_GET['mId'];

		$result = json_encode($mm->remove($mId));
		break;
	}
	case 'getEvents' :
	{
		// Текущий пользователь
		$cu = $_GET['cu'];

		// Пользователь с которым ведется диалог
		$mu = $_GET['mu'];
		
		$ts = intval($_GET['ts']);
		
		$mdbIn = array('$in'=> array($cu, $mu));
		
		$condition = array('from' => $mdbIn, 'to' => $mdbIn, 'lastModifed' => array('$gt' => $ts));
		
//		print_r($condition);
		
		$messages = $mm->get($condition);
		
		foreach ($messages as &$msg)
		{
			if ($msg['to'] == $cu)
			{
				$msg['status'] = 1;
				$mm->save($msg);
			}
		}

		$counters = $mm->getCounters($cu);

		$result = json_encode(array('messages' => $messages, 'counters' => $counters));
	}
}

//	$callback = @$_GET['callback'];
//	if (!is_null($callback)) $result = $callback."(" . $result . ");";

echo $result;