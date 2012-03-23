<?php

include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '/BaseEntity.php';

class User extends BaseEntity
{
	public $fName = '';
	public $lName = '';

	public $avatar = null;

	/**
	 * Пол. 1 - мужчина, 0 - женщина (мнемоническое правило =)))))
	 *
	 * @var integer
	 */
	public $sex = 1;
	public $age = '';
	public $country = '';
	public $city = '';
	public $online = false;
}