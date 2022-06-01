const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExUrl } = require('../utils/regEx');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(RegExp(regExUrl)),
    }),
  }),
  auth,
  createCard,
);
router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().min(24).max(24),
    }),
  }),
  auth,
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().min(24).max(24),
    }),
  }),
  auth,
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().min(24).max(24),
    }),
  }),
  auth,
  dislikeCard,
);

module.exports = router;
