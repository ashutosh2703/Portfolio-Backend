// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   res
//     .status(statusCode)
//     .cookie("token", token, {
//       maxAge: Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000, // 10 days
//       httpOnly: true,
//       sameSite: "Strict",
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .header("Authorization", `Bearer ${token}`) // ✅ send token in headers
    .json({
      success: true,
      message,
      user,
      token, // still return in body too (for frontend)
    });
};
