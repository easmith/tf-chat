<?
//sleep(1);
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
		$messages = $mm->getMessages($ownerId, $senderId);
		echo json_encode($messages);
		break;
	}
	case 'sendMessage' :
	{
		$from = $_GET['from'];
		$to = $_GET['to'];
		$type = $_POST['type'];
		$content = $_POST['content'];

		$m = $mm->sendMessage($from, $to, $type, $content);
		echo json_encode(array("cmd" => "TF.drawMessageItem(" . json_encode($m) . ")"));
		break;
	}
	case 'removeMessage' :
	{
		$mId = $_GET['mId'];

		echo json_encode($mm->remove($mId));
		break;
	}
	case 'getEvents' :
	{
		// Текущий пользователь
		$cu = $_GET['cu'];

		// Пользователь с которым ведется диалог
		$mu = $_GET['mu'];

		$e = $mm->getEvents($cu, $mu);

		echo json_encode($e);
	}
}
