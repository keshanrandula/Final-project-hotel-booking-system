// // // import jwt from "jsonwebtoken";
// // // import Admin from "../models/Admin.js";

// // // export const protectAdmin = async (req, res, next) => {
// // //   let token;
// // //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// // //     token = req.headers.authorization.split(" ")[1];
// // //   }

// // //   if (!token) return res.status(401).json({ message: "Not authorized, no token" });

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const admin = await Admin.findById(decoded.id).select("-password");
// // //     if (!admin) return res.status(404).json({ message: "Admin not found" });

// // //     req.admin = admin;
// // //     next();
// // //   } catch (err) {
// // //     res.status(401).json({ message: "Not authorized, token failed" });
// // //   }
// // // };


// // /////////////////////////////////////////////

// // // middleware/adminAuthMiddleware.js
// // import jwt from "jsonwebtoken";
// // import Admin from "../models/Admin.js";

// // export const protectAdmin = async (req, res, next) => {
// //   let token;

// //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //     try {
// //       token = req.headers.authorization.split(" ")[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
// //       req.admin = await Admin.findById(decoded.id).select("-password");
      
// //       if (!req.admin) {
// //         return res.status(401).json({ 
// //           success: false,
// //           message: "Admin not found" 
// //         });
// //       }

// //       if (!req.admin.isActive) {
// //         return res.status(403).json({ 
// //           success: false,
// //           message: "Account is deactivated" 
// //         });
// //       }

// //       next();
// //     } catch (error) {
// //       console.error(error);
// //       return res.status(401).json({ 
// //         success: false,
// //         message: "Not authorized, token failed" 
// //       });
// //     }
// //   }

// //   if (!token) {
// //     return res.status(401).json({ 
// //       success: false,
// //       message: "Not authorized, no token" 
// //     });
// //   }
// // };

// // // Role-based middleware
// // export const authorizeRoles = (...roles) => {
// //   return (req, res, next) => {
// //     if (!roles.includes(req.admin.role)) {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Role (${req.admin.role}) is not allowed to access this resource`
// //       });
// //     }
// //     next();
// //   };
// // };

// //////////////////////////////////////////////////

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// // Protect admin routes
// export const protectAdmin = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach admin to request
//       req.admin = await Admin.findById(decoded.id).select("-password");

//       if (!req.admin) {
//         return res.status(401).json({
//           success: false,
//           message: "Not authorized, admin not found",
//         });
//       }

//       next();
//     } catch (error) {
//       console.error("JWT ERROR:", error.message);
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, token failed",
//       });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, no token",
//     });
//   }
// };

// // Role-based authorization
// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!req.admin || !roles.includes(req.admin.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied for this role",
//       });
//     }
//     next();
//   };
// };


///////////////////////////////////////////////////////////

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// export const protectAdmin = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization;

//     if (!auth || !auth.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token" });
//     }

//     const token = auth.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.admin = await Admin.findById(decoded.id).select("-password");
//     next();
//   } catch {
//     res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.admin.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };


////////////////////////////////////////////////////

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

