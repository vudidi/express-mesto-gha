const Card = require('../models/cards');
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require('../utils/errors');

const getCards = (_, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Card.create({ name, link, owner })
    .then(() => {
      res.status(201).send({ message: 'Карточка успешно добавлена!' });
    })
    .catch((err) => {
      const fields = Object.keys(err.errors).join(', ');

      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Переданы некорректные данные при создании карточки: ${fields}`
          )
        );
      }
      next(new ServerError('Произошла ошибка'));
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена.'));
      }
      res.status(200).send({ message: 'Карточка удалена.' });
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена.'));
      }
      res.status(200).send(card);
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена.'));
      }
      res.status(200).send(card);
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
