const serve = require("serve");
const path = require("path");

//do we need?
const server = serve(path.join(__dirname, "/build"), {
  port: 3005,
  ignore: ["node_modules"]
});
