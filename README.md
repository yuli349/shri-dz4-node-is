# CI сервер - React 2

<h2>Установка</h2>

OC - Windows

node - v14.17.0

<ol>
  <li>Скопируйте содержимое файла .env.example в .env</li>
  <li>Впишите авторизационные токен в .env</li>
  <li>npm install - установка всех зависимостей</li>
  <li>npm run start - запуск сервера (nodemon есть, запускается через npm run dev, но он не дает сформировать логи при запуске билда)</li>
  <li>перейти в папку client</li>
  <li>npm install - установка всех зависимостей</li>
  <li>npm start - запуск приложения</li>
</ol>

<h2>Описание</h2>

<ul>
  <li>Стартовая страница ведет на страницу настроек</li>
  <li>После ввода обязательных параметров (repository && build command) можно отправить форму</li>
  <li>Если репозиторий не склонирован - кнопки дизейблятся и выходит ошибка</li>
  <li>При клонировании - редирект на список билдов</li>
  <li>Создаем первый билд, открыв попап и подставив в него commit hash</li>
  <li>После того, как создался билд - редиретит на детальную страницу билда</li>
  <li>Нажав на кнопку Rebuild - запустится новый билд с этим же commit hash</li>
  <li>После создания так же средиректит на созданный билд</li>
  <li>Кнопка Show more добавляет в список по 9 или 5 элементов в зависимости от разрешения</li>
  <li>Извиняюсь за отсутствие кеширования)</li>
</ul>

<h2>Тесты</h2>

<h3>Серверные</h3>
На сервере unit-тестами проверяю правильную передачу аргументов и проверяю запросы на ручки (мокая axios).
Чтобы запустить тесты на сервере - установите все зависимости, а затем:
```
npm test
```
<h3>Клиентские</h3>

На клиенте unit-тесты написаны для компонентов start, header, form.
Чтобы запустить тесты - установите все зависимости в папке client, а затем:
```
npm test
```
Гермиону успела только установить, но тесты не написала =(
