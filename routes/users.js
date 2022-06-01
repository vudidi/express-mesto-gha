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
router.post('/signin', login);
router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
