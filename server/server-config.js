const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/index");
const importer = require("./importJSON");

const app = express();

// TODO: Implement for some api end points
// const basicAuth = require("express-basic-auth");
// if (process.env.NODE_ENV !== "development") {
//   app.use(
//     basicAuth({
//       users: { someuser: "somepassword" },
//       challenge: true,
//       realm: "Imb4T3st4pp"
//     })
//   );
// }

var corsOptions = {
  origin: process.env.WEB_APP_API_HOST,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "20mb" }));

app.use("/api", router.api);

app.post("/import", (req, res) => {
  importer.importFromJSON(req.body);
  res.sendStatus("200");
});

module.exports = app;
