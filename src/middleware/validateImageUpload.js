module.exports = function(req, res, next) {
    if (!req.files) {
      return res.status(401).json('No file uploaded');
    }
    next();
  }