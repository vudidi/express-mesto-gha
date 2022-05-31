const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { Unauthorized } = require('../utils/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return User.findById(req.user._id).then((user) => {
    if (!user) {
      return next(new Unauthorized('Необходима авторизация'));
    }
    return next();
  });
};
