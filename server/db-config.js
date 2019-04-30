require("dotenv").config();
const fs = require("fs");
const certFileBuf = fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem");
const Fawn = require("fawn");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;

const options = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true
};

// if (isInLambda) {
//   options.ssl = true;
//   options.sslCA = certFileBuf;
// }

mongoose.connect(process.env.MONGODB_HOST, options);

Fawn.init(mongoose);

module.exports = mongoose.connection;
