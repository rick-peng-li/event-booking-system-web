const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
   const {
  title,
  description,
  date,
  location,
  seats,
  organizer,
} = req.body;
    const event = await Event.create({
  title,
  description,
  date,
  location,
  seats,
  organizer,
});
    res.status(201).json({
      message: "Event Created Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
  const events = await Event.find()
  .populate("organizer", "name email");
  

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOrganizerEvents = async (req, res) => {

  try {

    const events = await Event.find({
      organizer: req.params.organizerId,
    });

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Updated Successfully",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createEvent,
  getAllEvents,
  getOrganizerEvents,
  deleteEvent,
  updateEvent,
};