module.exports = function(req, res, next) {
    if (!req.session.user) {
      return res.status(401).json('unable to find session');
    }
    next();
  }