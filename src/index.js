const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");
const route = require("./routes");
const db = require("./configs/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

db.connect(process.env.DATABASE_URL);

db.connection.on("error", (err) => console.log(err));
db.connection.on("open", () => console.log("Database connected"));

app.use(cors());
app.use(cookieParser());

//MiddleWare body-parser
app.use(
  express.urlencoded({
    extended: true,
  })
); //For submit HTML
app.use(express.json()); //For fetch, XMLRequest, axios,....
app.use(morgan("tiny"));
app.use(route);

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
