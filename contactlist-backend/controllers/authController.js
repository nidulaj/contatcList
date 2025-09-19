const jwt = require("jsonwebtoken");
const {
  findUserByCredentials,
  createUser,
  findUserByUsername,
  updateUser,
  deleteUser,
  send2FACodeToDB,
  get2FA,
  delete2FA,
  get2FAStatus,
  change2FAStatus,
  emailVerification,
  updateUserPassword,
} = require("../models/userModel");
const {
  send2FACode,
  sendVerificationLink,
  sendResetPasswordLink,
} = require("../utils/mailer");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByCredentials(username, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", userNotFound: true });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid password", invalidPassword: true });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email first.",
        isVerified: false,
      });
    }

    if (user.two_fa_enabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await send2FACodeToDB(code, user.id);
      await send2FACode(user.email, code);

      const tempToken = jwt.sign(
        { username: user.username },
        process.env.TEMP_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      return res.status(200).json({ is2FAEnabled: true, tempToken });
    } else {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" } // use 15 minutes in production
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return res.status(200).json({ is2FAEnabled: false });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        message: "Username is already registered. Try another username.",
      });
    }

    const newUser = await createUser(
      firstName,
      lastName,
      email,
      username,
      password
    );

    const emailToken = jwt.sign(
      { username: username },
      process.env.EMAIL_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const verificationLink = `https://your-backend-domain.com/auth/verify-email?token=${emailToken}`;
    await sendVerificationLink(newUser.email, verificationLink);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserInfo = async (req, res) => {
  const username = req.user.username;

  try {
    const loggedUser = await findUserByUsername(username);
    res.status(201).json({ message: loggedUser });
  } catch (err) {
    console.error("User profile Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const username = req.user.username;
  const { firstName, lastName, email } = req.body;

  try {
    const updatedUser = await updateUser(username, {
      firstName,
      lastName,
      email,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProfile = async (req, res) => {
  const username = req.user.username;

  try {
    const deletedUser = await deleteUser(username);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token refreshed" });
  });
};

const verify2FA = async (req, res) => {
  const username = req.user.username;
  const { code } = req.body;

  try {
    const verifyedUser = await get2FA(username, code);

    if (!verifyedUser) {
      return res.status(401).json({ message: "Invalid 2FA code" });
    }

    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await delete2FA(username);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "2FA verified" });
  } catch (err) {
    console.error("2FA verify error:", err);
    res
      .status(500)
      .json({ message: "2FA verification error", error: err.message });
  }
};

const toggle2FA = async (req, res) => {
  try {
    const username = req.user.username;
    const status = await get2FAStatus(username);
    const newStatus = await change2FAStatus(status, username);
    res.json({ success: true, twoFAEnabled: newStatus });
  } catch (err) {
    console.error("2FA toggle error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
    const username = decoded.username;
    await emailVerification(username);
    res.redirect("https://your-frontend-domain.com/verify-email");
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const resendVerificationLink = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const emailToken = jwt.sign(
      { username: username },
      process.env.EMAIL_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const verificationLink = `https://your-backend-domain.com/auth/verify-email?token=${emailToken}`;
    await sendVerificationLink(user.email, verificationLink);
    res.status(200).json({ message: "Verification link resent successfully" });
  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", userNotFound: true });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email first.",
        isVerified: false,
      });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.PASSWORD_RESET_SECRET,
      { expiresIn: "15m" }
    );
    const resetLink = `https://your-frontend-domain.com/reset-password?token=${token}`;
    await sendResetPasswordLink(email, resetLink);
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.error("forgot password link Error:", err);
    res.status(500).json({ error: "forgot password link error" });
  }
};

const updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
    const username = decoded.username;

    await updateUserPassword(newPassword, username);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password Error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  register,
  getUserInfo,
  updateProfile,
  deleteProfile,
  refreshToken,
  verify2FA,
  toggle2FA,
  verifyEmail,
  resendVerificationLink,
  forgotPassword,
  updatePassword,
  logout,
};
