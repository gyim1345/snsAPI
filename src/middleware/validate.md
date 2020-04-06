
module.exports = (validator) => {
  console.log('asdasd1')
  return (req, res, next) => {
    console.log('asdasd2')
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  }
}