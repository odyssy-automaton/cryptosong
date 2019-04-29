const dotenv = require("dotenv");
dotenv.config();

const app = require("./server-config");

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
const port = process.env.PORT || 3005;

if (isInLambda) {
  const serverlessExpress = require("aws-serverless-express");
  const server = serverlessExpress.createServer(app);
  exports.main = (event, context) =>
    serverlessExpress.proxy(server, event, context);
} else {
  app.listen(port, () => console.log(`Serving up fresh JSON on port ${port}`));
}
