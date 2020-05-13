module.exports = function(req, res, next) {
  if (!Number(req.params.id)) {
    return res.status(404).send('Invalid ID.');
  }

  next();
}