<?php

class BaseManager
{
	protected $db;

	public function  __construct()
	{
		$m = new Mongo();
		$this->db = $m->tf;
		$this->entity = strtolower(str_replace("Manager", "", get_class($this)));
	}
	
	public function get($query = array(), $filds = array())
	{
		$cursor = $this->db->{$this->entity}->find($query, $filds)->sort(array('ts' => 1));
		return $this->likeId($cursor);
	}
	
	public function likeId($cursor)
	{
		$result = iterator_to_array($cursor);
		foreach ($result as &$res)
		{
			$res['_id'] = (string) $res['_id'];
		}
		return $result;
	}
	
	public function save($entity)
	{
		$entity = (array) $entity;
		
		$id = @$entity['_id'];
		unset($entity['_id']);
		
		if (is_null($id))
		{
			$this->db->{$this->entity}->insert($entity);
		}
		else
		{
			$this->db->{$this->entity}->update(array('_id' => new MongoID($id)), $entity);
		}

		return $entity;
	}
	
	public function remove($entity)
	{
		$id = (is_string($entity)) ? $entity : $entity = $entity->_id;
		
		return $this->db->{$this->entity}->remove(array('_id' => new MongoID($id)));
	}
}
