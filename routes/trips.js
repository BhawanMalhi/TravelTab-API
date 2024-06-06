const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readTrips() {
    const tripsData = fs.readFileSync("./data/trips.json");
    const parsedData = JSON.parse(tripsData);
    return parsedData;
  }

  router.get("/", (req, res) => {
    const trips = readTrips();
    res.json(trips);
  });

  function ran() {
    return Math.floor(Math.random() * 12);
  }
  router.get("/:id", (req, res) => {
    const trips = readTrips();
    const requestedId = req.params.id;
    console.log(requestedId);
    const singleTrip = trips.find(t => t.id === requestedId);
    if (singleTrip) {
      res.json(singleTrip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
    res.send(singleTrip);
  });
  
  

  router.post("/", (req, res) => {
    const trips = readTrips();
     const newTrip = {
      id: uuidv4(),
      place: req.body.place,
      country:req.body.country,
      src: `http://localhost:8080/public-images/image${ran()}.jpg`,
      expenses: []
    };
    trips.push(newTrip);
    fs.writeFileSync("./data/trips.json", JSON.stringify(trips));
    res.status(201).send(newTrip);
  });


  router.post("/:id/addExpense", (req, res) => {
    const trips = readTrips();
    const requestedId = req.params.id;
    const trip = trips.find(t => t.id === requestedId);
     const newExpense = {
      id: uuidv4(),
      category: req.body.category,
      amount:req.body.amount,
      discription: req.body.discription 
    };
    trip.expenses.push(newExpense);
    fs.writeFileSync("./data/trips.json", JSON.stringify(trips));
    res.status(201).send(newExpense);
  });




  
  module.exports = router;