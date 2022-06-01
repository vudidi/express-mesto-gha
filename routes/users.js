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
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().hex().min(24).max(24),
    }),
  }),
  auth,
  getUserById,
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  auth,
  updateProfile,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(RegExp(regExUrl)),
    }),
  }),
  auth,
  updateUserAvatar,
);

module.exports = router;
