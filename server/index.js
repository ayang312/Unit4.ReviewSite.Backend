const express = require("express");
const app = express();
const routes = require("./routes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// connect to port
require("dotenv").config();
const port = process.env.PORT;

// Body-parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));

// use the imported API routes
app.use("/api", routes);

// Simple error-handling middleware

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

module.exports = prisma;
