// // import jwt from "jsonwebtoken";
// // import Admin from "../models/Admin.js";

// // // Register admin
// // export const registerAdmin = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     const existingAdmin = await Admin.findOne({ email });
// //     if (existingAdmin) {
// //       return res.status(400).json({ message: "Email already registered" });
// //     }

// //     const admin = await Admin.create({ name, email, password });

// //     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
// //       expiresIn: "7d",
// //     });

// //     res.status(201).json({ admin, token });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error registering admin", error: error.message });
// //   }
// // };

// // // Login admin
// // export const loginAdmin = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const admin = await Admin.findOne({ email });
// //     if (!admin) return res.status(404).json({ message: "Admin not found" });

// //     const isMatch = await admin.matchPassword(password);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

// //     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
// //       expiresIn: "7d",
// //     });

// //     res.json({ admin, token });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error logging in", error: error.message });
// //   }
// // };

// // // Get admin profile
// // export const getAdminProfile = async (req, res) => {
// //   const admin = await Admin.findById(req.admin._id).select("-password");
// //   res.json(admin);
// // };


// ////////////////////////////////////////////

// // controllers/AdminController.js
// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// // Register admin (only for super-admin)
// export const registerAdmin = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if requester is super-admin
//     if (req.admin.role !== "super-admin") {
//       return res.status(403).json({ message: "Only super-admin can register new admins" });
//     }

//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const admin = await Admin.create({ 
//       name, 
//       email, 
//       password, 
//       role: role || "admin" 
//     });

//     res.status(201).json({ 
//       success: true,
//       message: "Admin registered successfully",
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//         createdAt: admin.createdAt
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error registering admin", 
//       error: error.message 
//     });
//   }
// };

// // Login admin
// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });
    
//     if (!admin) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Admin not found" 
//       });
//     }

//     if (!admin.isActive) {
//       return res.status(403).json({ 
//         success: false,
//         message: "Account is deactivated" 
//       });
//     }

//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ 
//         success: false,
//         message: "Invalid credentials" 
//       });
//     }

//     // Update last login
//     await admin.updateLastLogin();

//     const token = jwt.sign({ 
//       id: admin._id,
//       role: admin.role,
//       email: admin.email
//     }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({ 
//       success: true,
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//         lastLogin: admin.lastLogin
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error logging in", 
//       error: error.message 
//     });
//   }
// };

// // Get admin profile
// export const getAdminProfile = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.admin._id).select("-password");
//     res.json({ 
//       success: true,
//       admin 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error fetching profile", 
//       error: error.message 
//     });
//   }
// };

// // Get all admins (super-admin only)
// export const getAllAdmins = async (req, res) => {
//   try {
//     if (req.admin.role !== "super-admin") {
//       return res.status(403).json({ 
//         success: false,
//         message: "Only super-admin can view all admins" 
//       });
//     }

//     const admins = await Admin.find().select("-password");
//     res.json({ 
//       success: true,
//       count: admins.length,
//       admins 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error fetching admins", 
//       error: error.message 
//     });
//   }
// };

// // Update admin status
// export const updateAdminStatus = async (req, res) => {
//   try {
//     if (req.admin.role !== "super-admin") {
//       return res.status(403).json({ 
//         success: false,
//         message: "Only super-admin can update admin status" 
//       });
//     }

//     const { id } = req.params;
//     const { isActive } = req.body;

//     // Prevent super-admin from deactivating themselves
//     if (id === req.admin._id.toString()) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Cannot modify your own status" 
//       });
//     }

//     const admin = await Admin.findByIdAndUpdate(
//       id,
//       { isActive },
//       { new: true }
//     ).select("-password");

//     if (!admin) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Admin not found" 
//       });
//     }

//     res.json({ 
//       success: true,
//       message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
//       admin 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error updating admin status", 
//       error: error.message 
//     });
//   }
// };

// // Update admin profile
// export const updateAdminProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const admin = await Admin.findById(req.admin._id);

//     if (!admin) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Admin not found" 
//       });
//     }

//     // Check if email is already taken by another admin
//     if (email && email !== admin.email) {
//       const existingAdmin = await Admin.findOne({ email });
//       if (existingAdmin) {
//         return res.status(400).json({ 
//           success: false,
//           message: "Email already in use" 
//         });
//       }
//       admin.email = email;
//     }

//     if (name) admin.name = name;
    
//     await admin.save();

//     res.json({ 
//       success: true,
//       message: "Profile updated successfully",
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error updating profile", 
//       error: error.message 
//     });
//   }
// };

// // Change password
// export const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const admin = await Admin.findById(req.admin._id);

//     const isMatch = await admin.matchPassword(currentPassword);
//     if (!isMatch) {
//       return res.status(401).json({ 
//         success: false,
//         message: "Current password is incorrect" 
//       });
//     }

//     admin.password = newPassword;
//     await admin.save();

//     res.json({ 
//       success: true,
//       message: "Password changed successfully" 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error changing password", 
//       error: error.message 
//     });
//   }
// };

// // Dashboard statistics
// export const getDashboardStats = async (req, res) => {
//   try {
//     // Import other models
//     const Hotel = (await import("../models/Hotel.js")).default;
//     // const Staff = (await import("../models/Staff.js")).default;
//     const Booking = (await import("../models/Booking.js")).default;

//     // Get counts
//     const totalHotels = await Hotel.countDocuments();
//     const totalStaff = await Staff.countDocuments();
//     const totalBookings = await Booking.countDocuments();
//     const totalAdmins = await Admin.countDocuments();
    
//     // Get recent bookings
//     const recentBookings = await Booking.find()
//       .sort({ createdAt: -1 })
//       .limit(10)
//       .populate("hotel", "name")
//       .populate("user", "name email");

//     // Get monthly booking stats
//     const currentDate = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

//     const monthlyStats = await Booking.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: sixMonthsAgo }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$createdAt" },
//             month: { $month: "$createdAt" }
//           },
//           count: { $sum: 1 },
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       },
//       {
//         $sort: { "_id.year": 1, "_id.month": 1 }
//       }
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalHotels,
//         totalStaff,
//         totalBookings,
//         totalAdmins,
//         recentBookings,
//         monthlyStats
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Error fetching dashboard stats", 
//       error: error.message 
//     });
//   }
// };

///////////////////////////////////////////////////////////////////////

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await Admin.findOne({ email });

//   if (!admin || !(await admin.matchPassword(password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign(
//     { id: admin._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.json({ token, admin });
// };

// export const registerAdmin = async (req, res) => {
//   const admin = await Admin.create(req.body);
//   res.json({ message: "Admin registered", admin });
// };



//////////////////////////////////////////////////////////////////////

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Admin registered",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ADMIN PROFILE
export const getAdminProfile = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

// LOGOUT ADMIN
export const logoutAdmin = async (req, res) => {
  res.json({
    success: true,
    message: "Admin logged out successfully",
  });
};

/////////////////////////////

// Admin Profile Update Handler
export const updateAdminProfile = async (req, res) => {
  const { name, email, password, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin._id);

    // Update name and email
    if (name) admin.name = name;
    if (email) admin.email = email;

    // Handle password update
    if (password && newPassword) {
      // Check if current password is correct
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Update to new password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    // Save updated admin
    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully!",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};