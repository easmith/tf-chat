<?php

class BaseEntity
{
	public function __construct()
	{
		$this->id = md5(uniqid(rand(0, 1000), true));
	}
}