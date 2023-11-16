const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const tokenService = require("./tokenService");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/generate-token", (req, res) => {
  const generatedToken = tokenService.generateToken();
  res.json({ token: generatedToken });
});

app.post("/api/validate-token", (req, res) => {
  const { token } = req.body;
  const isValid = tokenService.validateToken(token);
  res.json({ valid: isValid });
});

app.post("/api/infinite-token-generation", (req, res) => {
  const { start } = req.body;
  if (start) {
    tokenService.generateInfiniteTokens();
    res.json({ message: "Infinite token generation started." });
  } else {
    tokenService.stopInfiniteTokenGeneration();
    tokenService.resetTokenCounts();
    res.json({ message: "Infinite token generation stopped." });
  }
});

app.get("/api/token-statistics", (req, res) => {
  const { total, valid } = tokenService.getTokenStatistics();
  res.json({ total, valid });
});
