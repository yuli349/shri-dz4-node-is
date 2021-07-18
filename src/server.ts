require('dotenv').config();
import express from "express";
import apiRouter from './routers';
import corsMiddleware from './middleware/cors.middleware';

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
