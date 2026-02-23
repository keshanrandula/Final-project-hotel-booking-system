

import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} from "../controllers/AdminController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/**
 * =====================
 * PUBLIC ROUTES
 * =====================
 */

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

export default router;




