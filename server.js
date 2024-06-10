const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const cors = require("cors");
const tripsRoute = require("./routes/trips.js");
const usersRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");

app.use(cors());
app.use(express.json());
app.use("/public-images", express.static("./public/images"));
app.use ("/travelTab/trips", tripsRoute);
app.use ("/travelTab/trips/:id", tripsRoute);
app.use("/register", usersRoute);
app.use("/login", loginRoute)


app.get("/", (req, res) => {
    res.send("the get request");
  });

  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });