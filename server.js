const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/manga", require("./routes/manga"));

app.listen(5000, () =>
  console.log("Zorouiverse running at http://localhost:5000")
);
