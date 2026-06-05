const express = require("express");

const router = express.Router();

const {
  createEvent,
  getAllEvents,
   getOrganizerEvents,
    deleteEvent,
    updateEvent,
} = require("../controllers/eventController");

router.post("/create", createEvent);

router.get("/", getAllEvents);
router.get(
  "/organizer/:organizerId",
  getOrganizerEvents
);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);
module.exports = router;