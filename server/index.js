const express = require("express");
const app = express();
const port = process.env.PORT;

// Body-parsing middleware

// use the imported API routes

// Simple error-handling middleware

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
