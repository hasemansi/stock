import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../token.js";

dotenv.config();
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashed });
        await user.save();

        res.status(201).json({ message: "User Registered Successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not exists" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Login Successfull",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    const newAccessToken = generateAccessToken(user._id);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id name'); // only id and name
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};