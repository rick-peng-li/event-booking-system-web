const Event = require("../models/Event");
const Booking = require("../models/Booking");

const bookEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const event = await Event.findById(eventId);

  

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    if (event.seats <= 0) {
      return res.status(400).json({
        message: "No Seats Available",
      });
    }

    event.seats -= 1;

    await event.save();

    const ticketId =
      "TKT" + Math.floor(Math.random() * 1000000);

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      ticketId,
    });

    res.status(201).json({
      message: "Event Booked Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
const bookings = await Booking.find()
  .populate("user", "name email")
  .populate("event", "title");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookEvent,
  getBookings,
};