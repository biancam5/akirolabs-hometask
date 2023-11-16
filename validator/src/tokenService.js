const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

let totalTokens = 0;
let validTokens = 0;
app.use(cors());
app.use(bodyParser.json());

const generateToken = () => {
  const availableDigits = ["0", "2", "4", "7", "9"];
  const tokenLength = 16;
  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableDigits.length);
    token += availableDigits[randomIndex];
  }

  const formattedToken = token.replace(/(\d{4})/g, "$1-").slice(0, -1);
  return formattedToken;
};

const validateToken = (token) => {  
  const sanitizedToken = token.replace(/-/g, "");
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitizedToken.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedToken.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const isValid = sum % 10 === 0;
 
  return isValid;
};

let infiniteTokenGenerationInterval;

const generateInfiniteTokens = () => {
  infiniteTokenGenerationInterval = setInterval(() => {
    const generatedToken = generateToken();
    totalTokens++;
    validTokens += validateToken(generatedToken) ? 1 : 0;
    if (someCondition) {
      stopInfiniteTokenGeneration();
    }
  }, 1000);
};

const stopInfiniteTokenGeneration = () => {
  clearInterval(infiniteTokenGenerationInterval);
  infiniteTokenGenerationInterval = null;
  generatedToken = "";
};

app.post("/api/generate-token", (req, res) => {
  const generatedToken = generateToken();
  totalTokens++;
  validTokens += validateToken(generatedToken) ? 1 : 0;

  res.json({ token: generatedToken });
});

app.post("/api/validate-token", (req, res) => {
  const { token } = req.body;
  const isValid = validateToken(token);
  validTokens += isValid ? 1 : 0;

  res.json({ valid: isValid });
});

app.post("/api/infinite-token-generation", (req, res) => {
  const { start } = req.body;
  if (start) {
    generateInfiniteTokens();
    res.json({ message: "Infinite token generation started." });
  } else {
    stopInfiniteTokenGeneration();
    res.json({ message: "Infinite token generation stopped." });
  }
});

app.get("/api/token-statistics", (req, res) => {
  res.json({ total: totalTokens, valid: validTokens });
});

app.listen(port, () => {
  console.log(`Validator service is running on http://localhost:${port}`);
});
