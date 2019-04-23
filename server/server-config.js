const express = require("express");
// const db = require("./db-config");
const bodyParser = require("body-parser");
// const path = require("path");
const cors = require("cors");

// const userController = require("./controllers/users");
// const songController = require("./controllers/songs");
const router = require("./routes/index");

const importer = require("./importJSON");

const app = express();
const basicAuth = require("express-basic-auth");

if (process.env.NODE_ENV != "development") {
  app.use(
    basicAuth({
      users: { someuser: "somepassword" },
      challenge: true,
      realm: "Imb4T3st4pp"
    })
  );
}

console.log("process.env.WEB_APP_API_HOST");
console.log(process.env.WEB_APP_API_HOST);

var corsOptions = {
  origin: process.env.WEB_APP_API_HOST,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.static("build"));

app.use("/api", router.api);

app.post("/import", (req, res) => {
  importer.importFromJSON(req.body);
  res.sendStatus("200");
});

// do we need
// app.get("/*", function(request, response) {
//   response.sendFile(path.resolve(__dirname, "../build/index.html"));
// });

module.exports = app;
