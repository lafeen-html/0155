<?php

class Person {
  private $name;
  private $lastname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $lastname, $age, $mother = null, $father = null) {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
    $this->hp = 100;
  }

  function sayHi($name) {
    return "Hi $name, I`m " . $this->name;
  }

  function setHp($hp) {
    if ($this->hp + $hp >= 100) $this->hp = 100;
    else $this->hp = $this->hp + $hp;
  }

  function getHp() {
    return $this->hp;
  }

  function getName() {
    return $this->name;
  }

  function getLastName() {
    return $this->lastname;
  }

  function getAge() {
    return $this->age;
  }

  function getMother() {
    return $this->mother;
  }

  function getFather() {
    return $this->father;
  }

  function getInfo() {
    return 
      "<h3> Пара слов обо мне: </h3>" .
      "<p> <strong> Мое имя: </strong>" . $this->getName() .
      "<br> <strong> Моя фамилия: </strong>" . $this->getLastname() .
      "<br> <strong> Мне: </strong>" . $this->getAge() . " лет </p>" .

      "<p> <strong> Моего папу зовут: </strong>" . $this->getFather()->getName() .
      "<br> <strong> Его фамилия: </strong>" . $this->getFather()->getLastname() .
      "<br> <strong> Ему: </strong>" . $this->getFather()->getAge() . " лет </p>" .

      "<p> <strong> Мою маму зовут: </strong>" . $this->getMother()->getName() .
      "<br> <strong> Её фамилия: </strong>" . $this->getMother()->getLastname() .
      "<br> <strong> Ей: </strong>" . $this->getMother()->getAge() . " лет </p>" .

      "<p> <strong> Моего дедушку по папиной линии зовут: </strong>" . $this->getFather()->getFather()->getName() .
      "<br> <strong> Его фамилия: </strong>" . $this->getFather()->getFather()->getLastname() .
      "<br> <strong> Ему: </strong>" . $this->getFather()->getFather()->getAge() . " лет </p>" .

      "<p> <strong> Мою бабушку по папиной линии зовут: </strong>" . $this->getFather()->getMother()->getName() .
      "<br> <strong> Её фамилия: </strong>" . $this->getFather()->getMother()->getLastname() .
      "<br> <strong> Ей: </strong>" . $this->getFather()->getMother()->getAge() . " лет </p>" .

      "<p> <strong> Моего дедушку по маминой линии зовут: </strong>" . $this->getMother()->getFather()->getName() .
      "<br> <strong> Его фамилия: </strong>" . $this->getMother()->getFather()->getLastname() .
      "<br> <strong> Ему: </strong>" . $this->getMother()->getFather()->getAge() . " года </p>" .

      "<p> <strong> Мою бабушку по маминой линии зовут: </strong>" . $this->getMother()->getMother()->getName() .
      "<br> <strong> Её фамилия: </strong>" . $this->getMother()->getMother()->getLastname() .
      "<br> <strong> Ей: </strong>" . $this->getMother()->getMother()->getAge() . " год </p>";
    //Вывести данные обо всей родне, включая бабушек и дедушек
  }
}

$svetlana = new Person("Svetlana", "Petrova", 69);
$oleg = new Person("Oleg", "Petrov", 70);
$irina = new Person("Irina", "Ivanova", 71);
$alex = new Person("Alex", "Ivanov", 72);
$igor = new Person("Igor", "Petrov", 40, $svetlana, $oleg);
$olga = new Person("Olga", "Petrova", 38, $irina, $alex);
$valera = new Person("Valera", "Petrov", 10, $olga, $igor);


echo $valera->getInfo();