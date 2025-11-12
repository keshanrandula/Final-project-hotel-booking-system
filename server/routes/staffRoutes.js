
import express from "express";
import { registerStaff, loginStaff, getStaffProfile ,updateStaffProfile} from "../controllers/staffController.js";
import { staffProtect } from "../middleware/staffMiddleware.js";

const router = express.Router();

router.post("/register", registerStaff);
router.post("/login", loginStaff);
router.get("/profile", staffProtect, getStaffProfile);
router.put("/profile", staffProtect, updateStaffProfile);


export default router;



