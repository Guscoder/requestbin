const express = require("express");
const app = express();
const database = require("./lib/dbAPI");
const port = 3010;
const binURL = "http://97dc-2600-1702-3740-4b60-2411-e825-f0d6-576f.ngrok.io";

app.use(express.static("public"));
app.use(express.json());

const getRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8)
  );
};

app.get("/create", async (req, res, next) => {
  let newString = getRandomString();
  try {
    let newBinUrl = `${binURL}/${newString}`;
    let currentDate = new Date();
    await database.createBin(newString, currentDate, false);
    res.send(`Your new bin url is ${newBinUrl}`);
  } catch {
    console.log(error);
    res.status(304).send(error);
  }
});

app.get("/inspect/:binId", async (req, res, next) => {
  let bin = req.params.binId;
  console.log(bin);

  let requestList = await database.getBinRequests(bin);
  res.sendStatus(200);
});

app.all("/:binID", async (req, res, next) => {
  // add request to proper bin in DB
  let bin = req.params.binID;
  console.log(bin);
  await database
    .addRequest(bin, req.body, req.method, req.headers)
    .catch(() => res.sendStatus(304));
  res.sendStatus(200);
});

app.listen(port, () => console.log("Running your sweet app!"));
