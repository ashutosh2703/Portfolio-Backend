import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new ErrorHandler("User not Authenticated!", 400));
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   req.user = await User.findById(decoded.id);
//   next();
// });

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token;

  // ✅ Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // get after "Bearer"
  }

  if (!token) {
    return next(new ErrorHandler("User not Authenticated!", 401));
  }
  console.log(token,"token");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or Expired Token!", 401));
  }
});
