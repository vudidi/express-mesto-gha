const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { errorHandler } = require('./utils/errorHandler');
const { pageNotFound } = require('./utils/pageNotFound');

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
app.use('*', pageNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});