const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/authRouter");
const transactionsRouter = require("./routes/transactionsRouter");
const userRouter = require("./routes/userRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);
app.use("/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  res.status(500).json({ message: err.message });
});

module.exports = app;
