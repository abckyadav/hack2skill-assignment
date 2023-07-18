const express = require("express");
const app = express();
const connectMongoDB = require("./Config/db");
require("dotenv").config();
const cors = require("cors");
const routes = require("../src/Routes/routes");

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use("/get", routes);

app.listen(port, async () => {
  try {
    await connectMongoDB();
    console.log(`listening on port ${port}`);
  } catch (error) {
    console.log("error", error);
  }
});
