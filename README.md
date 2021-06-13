# shri-dz4-node-is

<h2>Установка</h2>

<ol>
  <li>Скопируйте содержимое файла .env.example в .env</li>
  <li>Впишите авторизационные токен в .env</li>
  <li>npm install - установка всех зависимостей</li>
  <li>npm run start или npm run dev - запуск сервера</li>
</ol>

<h2>Как пользоваться</h2>

<p>Доступны следующие эндпоинты:</p>

<ul>
  <li>GET  http://localhost:3000/api/settings  — получение сохраненных настроек</li>
  <li>POST http://localhost:3000/api/settings  - cохранение настроек</li>
  <li>GET  http://localhost:3000/api/builds  - получение списка сборок</li>
  <li>POST http://localhost:3000/api/builds/:commitHash  - добавление сборки в очередь</li>
  <li>GET  http://localhost:3000/api/builds/:buildId  - получение информации о конкретной сборке</li>
  <li>GET  http://localhost:3000/api/builds/:buildId/logs  - получение логов билда (сплошной текст)</li>
</ul>
