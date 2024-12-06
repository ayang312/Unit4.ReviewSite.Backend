const app = require("./app");

// connect to port
require("dotenv").config();
const port = process.env.PORT;

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
