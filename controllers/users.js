const User = require('../models/users');
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('../utils/errors');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      return next(new ServerError('Произошла ошибка'));
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(() => {
      res.status(201).send({ message: 'Пользователь успешно создан!' });
    })
    .catch((err) => {
      const fields = Object.keys(err.errors).join(', ');

      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Переданы некорректные данные при создании пользователя: ${fields}`
          )
        );
      }
      next(new ServerError('Произошла ошибка'));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемый пользователь не найден.'));
      }
      res.status(200).send({ data: user });
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемый пользователь не найден.'));
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      const fields = Object.keys(err.errors).join(', ');

      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Переданы некорректные данные при обновлении пользователя: ${fields}`
          )
        );
      }

      next(new ServerError('Произошла ошибка'));
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемый пользователь не найден.'));
      }
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Обязательное поле для заполнения'));
      }

      next(new ServerError('Произошла ошибка'));
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateUserAvatar,
};
