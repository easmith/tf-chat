<?
header("Content-type: text/plain; charset=utf-8");

include_once './Manager/UserManager.php';
include_once './Manager/MessageManager.php';

$um = new UserManager();
$mm = new MessageManager();

$cmd = $_GET['cmd'];
switch ($cmd)
{
	case 'getUserList' : {
		$users = $um->getAll();
		echo json_encode($users);
		break;
	}
	
	case 'getMessage' :
	{
		$ownerId = $_GET['ownerId'];
		$senderId = $_GET['senderId'];
		$messages = $mm->getPair($ownerId, $senderId);
		$result = array();
		foreach ($messages as $message) $result[] = $message;
		echo json_encode($messages);
		break;
	}

}
