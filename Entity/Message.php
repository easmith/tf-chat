<?php

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseEntity.php';

class Message extends BaseEntity
{
	public $id;
	public $ts;

	/**
	 * Тип сообщения
	 * 0 - простое сообщение,
	 * 1 - оценка,
	 * 2 - подарок,
	 * 3 - симпатия.
	 *
	 * @var integer
	 */
	public $type;
	public $from;
	public $to;
	public $content;
	
	/**
	 * Статус сообщения:
	 * 0 - не прочитано,
	 * 1 - прочитано,
	 * 2 - удалено отправителем,
	 * 3 - удалено получателем,
	 * 4 - удалено отправителем и получателем)
	 *
	 * @var <type> 
	 */
	public $status;

	public function  __construct()
	{
		parent::__construct();
		$this->ts = time();
	}
}