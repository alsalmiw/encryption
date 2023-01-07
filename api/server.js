const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  console.log("i came to fetch");
  res.json({ user: "Sam Smith", testing: "1" });
});
app.post("/encrypt", (req, res) => {
  console.log("I came to return encrypted ssn");

  const decryptedData = CryptoJS.AES.decrypt(
    req.body.id,
    "my-secret-key"
  ).toString(CryptoJS.enc.Utf8);

  console.log("Decrypted data:", decryptedData);

  // res.send(decryptedData);
  res.json(decryptedData);
});

app.listen(5002, () => {
  console.log("listening on port 5002");
});
