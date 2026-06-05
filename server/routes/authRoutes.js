const express = require("express");

const router = express.Router();

const { registerUser, loginUser,  getUsers,  deleteUser, getPendingOrganizers, approveOrganizer, } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.get(
  "/pending-organizers",
  getPendingOrganizers
);
router.put(
  "/approve-organizer/:id",
  approveOrganizer
);
module.exports = router;