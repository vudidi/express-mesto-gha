require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { errorHandler } = require('./utils/errorHandler');
const { pageNotFound } = require('./utils/pageNotFound');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', auth, pageNotFound);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
