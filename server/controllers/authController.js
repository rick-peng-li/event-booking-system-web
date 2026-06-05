 const jwt = require("jsonwebtoken");
 const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Booking = require("../models/Booking");

const registerUser = async (req, res) => {
  try {
    const {
  name,
  email,
  password,
  role,
} = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
  isApproved:
    role === "organizer"
      ? false
      : true,
});

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    if (
  user.role === "organizer" &&
  !user.isApproved
) {

  return res.status(403).json({
    message:
      "Waiting For Admin Approval",
  });
}

    const token = jwt.sign(
      {
        id: user._id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {

  try {

    await Booking.deleteMany({
      user: req.params.id,
    });

    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
const getPendingOrganizers = async (
  req,
  res
) => {

  try {

    const organizers = await User.find({
      role: "organizer",
      isApproved: false,
    });

    res.status(200).json(organizers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
const approveOrganizer = async (
  req,
  res
) => {

  try {

    const organizer =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        {
          new: true,
        }
      );

    if (!organizer) {

      return res.status(404).json({
        message: "Organizer Not Found",
      });
    }

    res.status(200).json({
      message:
        "Organizer Approved Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { registerUser, loginUser , getUsers,  deleteUser, getPendingOrganizers, approveOrganizer,};



