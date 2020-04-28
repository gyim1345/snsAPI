module.exports = function(req, res, next) {
  if (!req.file) {
      return res.status(401).json('No file uploaded');
    }
    next();
  }