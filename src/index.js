const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const route = require('./routes')
const db = require('./configs/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

db.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

app.use(cors()) 
app.use(cookieParser()) 

//MiddleWare body-parser
app.use(
  express.urlencoded({
    extended: true,
  }),
); //For submit HTML
app.use(express.json()); //For fetch, XMLRequest, axios,....

app.use(morgan('tiny'), route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
