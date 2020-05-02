const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// create express
const app = express();

//dotenv
dotenv.config();

// body-parser
app.use(express.json());

// Configure Cors
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://",
    })
  );
} else {
  app.use(
    cors({
      origin: "https://localhost:3000",
    })
  );
}

// api
app.get(`/data`, (req, res) => {
  const data = {
    lastname: "dl",
    firstname: "wlrma",
  };
  res.json(data);
});

// Listen PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on PORT ${PORT}`);
});
