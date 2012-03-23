<?php

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseEntity.php';

class Message extends BaseEntity
{

	/**
	 * TimeStamp - Время создания сообщения
	 *
	 * @var integer
	 */
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

	/**
	 * Время последнего изменения сообщения
	 *
	 * @var integer
	 */
	public $lastModifed;

	public function  __construct()
	{
		parent::__construct();
		$this->ts = time();
//		$this->ts = new MongoDate();
		$this->lastModifed = $this->ts;
	}
}