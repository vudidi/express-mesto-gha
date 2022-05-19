module.exports.errorHandler = (err, req, res) => {
  res.status(err.statusCode).send({ message: err.message });
};
