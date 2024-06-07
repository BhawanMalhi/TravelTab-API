const express = require("express");
const router = express.Router();
const fs = require("fs");



function readUsers() {
    const usersData = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(usersData);
    return parsedData;
  }


//login post
  router.post("/", (req, res) => {
    const users = readUsers();
    const loginUser ={
      email: req.body.email,
      password:req.body.password,
    }
   
  
    const user = users.find(user => user.email === loginUser.email && user.password === loginUser.password);
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });

  module.exports = router;