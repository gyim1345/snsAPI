
module.exports = (validator) => {
  return (req, res, next) => {
    console.log(req.params.id)
    const { error } = validator(req);
    console.log('asd', error);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  }
}