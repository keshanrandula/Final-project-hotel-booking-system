import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,           // Add this
  updateUserByAdmin
  
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin routes
router.get("/", protect, getUsers);

//////////////////////////////////////

router.get("/", protect, getUsers);                    // Get all users
router.delete("/:id", protect, deleteUser);            // Delete user
router.put("/:id", protect, updateUserByAdmin); 

export default router;
