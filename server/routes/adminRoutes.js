// // import express from "express";
// // import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/AdminController.js";
// // import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

// // const router = express.Router();

// // router.post("/register", registerAdmin);
// // router.post("/login", loginAdmin);
// // router.get("/profile", protectAdmin, getAdminProfile);





// // export default router;


// //////////////////////////////////////////////////

// // routes/adminRoutes.js
// import express from "express";
// import { 
//   registerAdmin, 
//   loginAdmin, 
//   getAdminProfile,
//   getAllAdmins,
//   updateAdminStatus,
//   updateAdminProfile,
//   changePassword,
//   getDashboardStats
// } from "../controllers/AdminController.js";
// import { protectAdmin, authorizeRoles } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// // Public routes
// router.post("/login", loginAdmin);

// // Protected routes
// router.post("/register", protectAdmin, authorizeRoles("super-admin"), registerAdmin);
// router.get("/profile", protectAdmin, getAdminProfile);
// router.put("/profile", protectAdmin, updateAdminProfile);
// router.put("/change-password", protectAdmin, changePassword);
// router.get("/all", protectAdmin, authorizeRoles("super-admin"), getAllAdmins);
// router.put("/:id/status", protectAdmin, authorizeRoles("super-admin"), updateAdminStatus);
// router.get("/dashboard/stats", protectAdmin, getDashboardStats);

// export default router;

/////////////////////////////////////////////////////

import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/AdminController.js";
import { protectAdmin, authorizeRoles } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", protectAdmin, authorizeRoles("super-admin"), registerAdmin);

export default router;
