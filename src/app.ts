import express = require("express");
const app: express.Application = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! university");
});

export default app;
