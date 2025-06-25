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
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // res.send("signup route called");
  } catch (error) {
    console.log("signup server error", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists && (await userExists.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(userExists._id);
      await storeRefreshToken(userExists._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
      });
    } else {
      res.status(400).json({ message: "The email or password is incorrect" });
    }
  } catch (error) {
    console.log("Login server error", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decode.userId}`);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.json({ message: "User Logged out" });
    }
  } catch (error) {
    console.log("Logout server error", error.message);
    res
      .status(500)
      .json({ message: "Logout Server error", error: error.message });
  }
};

// recreate an access Token when it expires
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refreshToken" });
    }

    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decode.userId}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "invalid refreshToken" });
    }
    const accessToken = jwt.sign(
      { userId: decode.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // used to prevent XSS(cross site scripting) attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //helps prevent CSRF attacks (cross-site request forgery)
      maxAge: 20 * 60 * 1000, // 20 minutes, convert to milliseconds
    });
    res.json({ message: "Token refreshed" });
  } catch (error) {
    console.log("Token server error", error.message);
    res
      .status(500)
      .json({ message: "Token Server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // find all users
    res.json({ users });
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.Id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const refreshToken = req.cookies.refreshToken;
    // if (refreshToken) {
    //   const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    //   await redis.del(`refresh_token:${decode.userId}`);
    //   res.clearCookie("accessToken");
    //   res.clearCookie("refreshToken");
    //   res.json({ message: "User Logged out" });
    // }

    await User.findByIdAndDelete(req.params.Id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
