const express = require("express");
const app = express();
const port = 3010;

app.use(express.static("public"));

app.all("/requestbin", (req, res, next) => {
  console.log(req);
});

app.listen(port, () => console.log("Running your sweet app!"));
