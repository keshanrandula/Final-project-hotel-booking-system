import express from "express";
import {
  addFeedback,
  getMyFeedback,
  updateFeedback,
  deleteFeedback
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addFeedback);
router.get("/my", protect, getMyFeedback);
router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;
