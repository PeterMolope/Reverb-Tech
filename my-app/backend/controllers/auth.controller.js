import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../lib/redis.js";
dotenv.config();

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// store the refreshtoken to the Redis DB
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // will last for 7days (convert to seconds)
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // used to prevent XSS(cross site scripting) attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //helps prevent CSRF attacks (cross-site request forgery)
    maxAge: 20 * 60 * 1000, // 20 minutes, convert to milliseconds
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // used to prevent XSS(cross site scripting) attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //helps prevent CSRF attacks (cross-site request forgery)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, convert to milliseconds
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name });
    //start authenticating the user
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });

    // res.send("signup route called");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login route called");
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token: ${decode.user_id}`);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.json({ message: "User Logged out" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Logout Server error", error: error.message });
  }
};
