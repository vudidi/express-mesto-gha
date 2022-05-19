const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
