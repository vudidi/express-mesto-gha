const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
