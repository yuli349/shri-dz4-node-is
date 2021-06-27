require('dotenv').config();
const express = require('express');
const { apiRouter } = require('./routers');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/api', apiRouter);

const PORT = 3000;

const start = async () => {
  try {
     await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
  catch (e) {

  }
}

start();
