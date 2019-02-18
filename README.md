# Вычислитель отличий
<a href="https://codeclimate.com/github/Prisedaka/project-lvl2-s285/maintainability"><img src="https://api.codeclimate.com/v1/badges/6ca15152e1d36a8bee14/maintainability" /></a>
[![Build Status](https://travis-ci.org/Prisedaka/project-lvl2-s285.svg?branch=master)](https://travis-ci.org/Prisedaka/project-lvl2-s285)

## Install
```
$ npm install gendiff_prisedaka
```

## About 

Утилита для поиска отличий в конфигурационных файлах. Захватывает большую часть синтаксических возможностей js. Затрагиваемые темы: 
* cli.
* Форматы данных: json, yaml, ini. Трансляция данных из js в эти форматы и обратно. 
* Алгоритмическая подготовка.
* Архитектурные принципы: Фасад, Адаптер.
* Полиморфизм 
* Функциональное программирование

Возможности утилиты: 
* Поддержка разных форматов сравниваемых файлов: json, ini, yaml
* Генерация отчета в виде plain text, pretty и json 

Пример использования: 
```
$ gendiff --format plain first-config.ini second-config.ini 
Setting "common.setting2" deleted. 
Setting "common.setting4" added with value "blah blah". 
Setting "group1.baz" changed from "bas" to "bars". 
Section "group2" deleted. 
```
