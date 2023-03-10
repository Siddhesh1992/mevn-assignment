require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const swaggerDocument = require("./swagger");
const clientRouter = require("./routes/client");
const providerRouter = require("./routes/provider");

app.use(cors());
app.use(express.json());

app.use("/client", clientRouter);
app.use("/provider", providerRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ message: "Error", error: "Internal Server Error", data: [] });
});

app.listen(3000, () => {
  connectDB()
    .then((e) => {
      console.log("Mongodb Connected");
    })
    .catch((err) => console.log(err));
  console.log("Server started at port 3000");
});
