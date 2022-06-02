const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExUrl } = require('../utils/regEx');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateUserAvatar,
  login,
  getUserById,
} = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(RegExp(regExUrl)),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.get(
  '/users/:id',
  auth,
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);
router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(RegExp(regExUrl)),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
