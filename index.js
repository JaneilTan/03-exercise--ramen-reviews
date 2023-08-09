require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const router = require("./router");
app.use(express.json());

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "./apispec.yaml"), "utf8")
);

// routes
app.use("/api", router);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.EXPRESS_PORT;

app.listen(port || 5001, () => {
  console.log(`Server has started on port ${port}`);
});
