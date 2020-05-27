const mongoose = require('mongoose');

  module.exports = function () {
      const db = mongoose.connection;
      db.on('error', console.error);
      db.once('open', function () {
        })
        mongoose.connect(process.env.dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
}

