

import Staff from "../models/staff.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register staff
export const registerStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) return res.status(400).json({ message: "Email already registered" });

    const staff = await Staff.create({ firstName, lastName, email, password });
    const token = generateToken(staff._id);

    res.status(201).json({
      staff: {
        id: staff._id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        profilePicture: staff.profilePicture,
        role: staff.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login staff
export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await staff.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(staff._id);
    res.json({
      staff: {
        id: staff._id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        profilePicture: staff.profilePicture,
        role: staff.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get staff profile
export const getStaffProfile = async (req, res) => {
  try {
    res.json(req.staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update staff profile
export const updateStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.staff._id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const { firstName, lastName, email, password, profilePicture } = req.body;

    if (firstName) staff.firstName = firstName;
    if (lastName) staff.lastName = lastName;
    if (email) staff.email = email;
    if (profilePicture) staff.profilePicture = profilePicture;
    if (password) staff.password = password; // triggers hashing due to pre-save hook

    const updatedStaff = await staff.save();

    res.json({
      id: updatedStaff._id,
      firstName: updatedStaff.firstName,
      lastName: updatedStaff.lastName,
      email: updatedStaff.email,
      profilePicture: updatedStaff.profilePicture,
      role: updatedStaff.role,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


