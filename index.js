const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const peopleRoute = require("./routes/people");
require("dotenv").config();

app.set("trust proxy", 1);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URL_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/api/v1/people", peopleRoute);

app.listen(process.env.PORT_DEV, () => console.log("server is up"));
