require('dotenv').config();
const express = require('express');
const { apiRouter } = require('./routers');

const app = express();

app.use(express.json())
app.use('/api', apiRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
