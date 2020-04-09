import app from './app'

require('dotenv').config({ path: `/workspace/Project/snsAPI/src/.env.${process.env.NODE_ENV}` })
require('./startup/db')();

  app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
  });


export default app
