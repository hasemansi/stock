import express from "express";
import { loginUser, logout, refreshAccessToken, registerUser,getAllUsers } from '../controllers/UserController.js';
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/refresh", refreshAccessToken)
router.get('/users', getAllUsers);
export default router;