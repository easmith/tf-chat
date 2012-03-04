<?php

class BaseManager
{
	public function  __construct()
	{
	}

	public static function getEntityPath($entityName)
	{
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
		$fName = self::getEntityPath($entityName);

		$storage = unserialize(file_get_contents($fName));

		return isset($storage[$id]) ? $storage[$id] : null;
	}

	public function getAll($entityName)
	{
		$fName = self::getEntityPath($entityName);

		$storage = unserialize(file_get_contents($fName));

		return $storage;
	}
}