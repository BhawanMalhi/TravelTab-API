const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readUsers() {
    const usersData = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(usersData);
    return parsedData;
  }


  router.post("/", (req, res) => {
    const users = readUsers();
     const newUser = {
      id: uuidv4(),
      email: req.body.email,
      password:req.body.password,
      name: req.body.name,
    };
    const userExists = users.some(user => user.email === newUser.email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(201).send(newUser);
  });

  

  
  

module.exports = router;