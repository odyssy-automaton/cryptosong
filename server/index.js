const dotenv = require("dotenv");
dotenv.config();

const app = require("./server-config");
const port = process.env.PORT || 3005;

app.listen(port);

console.log("Serving up fresh JSON on port", port);
