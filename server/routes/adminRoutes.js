

import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  //////
  updateAdminProfile,
} from "../controllers/AdminController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();



// Admin login
router.post("/login", loginAdmin);

// (OPTIONAL) First-time admin register

router.post("/register", registerAdmin);

/**
 * =====================
 * PROTECTED ROUTES
 * =====================
 */

// Get logged-in admin profile
router.get("/profile", protectAdmin, getAdminProfile);

// Logout admin
router.post("/logout", protectAdmin, logoutAdmin);



// Update admin profile
router.put("/profile", protectAdmin, updateAdminProfile); // New route for updating profile







export default router;




