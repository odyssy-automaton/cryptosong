require("dotenv").config();
const fs = require("fs");
const Fawn = require("fawn");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const options = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_HOST, options);

Fawn.init(mongoose);

module.exports = mongoose.connection;
