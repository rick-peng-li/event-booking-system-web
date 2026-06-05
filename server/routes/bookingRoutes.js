const express = require("express");

const router = express.Router();

const {
  bookEvent,
  getBookings,
} = require("../controllers/bookingController");

router.post("/book", bookEvent);

router.get("/", getBookings);

module.exports = router;