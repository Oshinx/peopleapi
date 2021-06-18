const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const winston = require('winston');
const peopleRoute = require("./routes/people");
const notFoundRoute = require("./routes/notfound");
const logger = require('./logger/index');
require("dotenv").config();

app.set("trust proxy", 1);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//handles invalid routes 


mongoose
  .connect(process.env.DB_URL_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));


  app.use("/api/v1/people", peopleRoute);


      // Capture 404 errors
  app.use((req,res,next) => {
          res.status(404).send("Route NOT FOUND");
          logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  })
  



app.listen(process.env.PORT_DEV, () => console.log("Server don wake up"));
