// // import mongoose from "mongoose";
// // import bcrypt from "bcryptjs";

// // const adminSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //   },
// //   { timestamps: true }
// // );

// // // Hash password before saving
// // adminSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });

// // // Compare password method
// // adminSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // const Admin = mongoose.model("Admin", adminSchema);
// // export default Admin;

// ///////////////////////////////////////////

// // models/Admin.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const adminSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { 
//       type: String, 
//       enum: ["super-admin", "admin", "moderator"], 
//       default: "admin" 
//     },
//     isActive: { type: Boolean, default: true },
//     lastLogin: { type: Date }
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password method
// adminSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Method to update last login
// adminSchema.methods.updateLastLogin = async function () {
//   this.lastLogin = new Date();
//   await this.save();
// };

// const Admin = mongoose.model("Admin", adminSchema);
// export default Admin;


////////////////////////////////

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const adminSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     type: String,
//     enum: ["super-admin", "admin"],
//     default: "admin",
//   },
// });

// adminSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// adminSchema.methods.matchPassword = function (pw) {
//   return bcrypt.compare(pw, this.password);
// };

// export default mongoose.model("Admin", adminSchema);


//////////////////////////////////////////////////////////////

// models/Admin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["super-admin", "admin"],
    default: "admin",
  },
  refreshToken: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
adminSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove sensitive data when converting to JSON
adminSchema.methods.toJSON = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.refreshToken;
  return admin;
};

export default mongoose.model("Admin", adminSchema);