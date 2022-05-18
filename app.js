const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const { errorHandler } = require('./utils/errorHandler.js');
const { pageNotFound } = require('./utils/pageNotFound.js');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, _, next) => {
  req.user = {
    _id: '628281f3fa4e177f46aeee7a',
  };
  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('/', errorHandler);
app.use('*', pageNotFound);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
