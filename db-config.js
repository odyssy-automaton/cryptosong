require('dotenv').config()
const Fawn = require('fawn');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_HOST, {
  promiseLibrary: global.Promise
});

Fawn.init(mongoose);

module.exports = mongoose.connection;