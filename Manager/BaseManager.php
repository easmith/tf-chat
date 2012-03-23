<?php

class BaseManager
{
	protected $db;

	public function  __construct()
	{
		$m = new Mongo();
		$this->db = $m->tf;
	}

	public static function getEntityPath($entityName)
	{
		return "lol";
		$filename = dirname(__FILE__) . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "Storage" . DIRECTORY_SEPARATOR . $entityName . ".txt";
		if (!file_exists($filename))
			touch($filename);

		return $filename;
	}

	public static function save($obj)
	{
		if (!is_object($obj))
			return null;

		$fName = self::getEntityPath(get_class($obj));

		$storage = unserialize(file_get_contents($fName));
		$storage[$obj->id] = $obj;

		file_put_contents($fName, serialize($storage));

		return $obj;
	}

	public function get($id, $entityName)
	{
		return $this->db->$entityName->find(array("id" => $id));
	}

	public function getAll($entityName)
	{
		return $this->db->$entityName->find();
	}

	public function saveAll($data, $entityName)
	{
		$fName = self::getEntityPath($entityName);

		return file_put_contents($fName, serialize($data));
	}

	public function remove($id, $entityName)
	{
		$fName = self::getEntityPath($entityName);

		$storage = unserialize(file_get_contents($fName));
		$result = isset($storage[$id]) ? true : false;
		unset($storage[$id]);
		file_put_contents(self::getEntityPath($entityName), serialize($storage));
		
		return $result;
	}
}
