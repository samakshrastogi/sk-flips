import express from "express";
import {
    registerUser,
    loginUser,
    getUsers,
    getMe,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
console.log("🔥 user.routes.js LOADED");

const router = express.Router();

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected
router.get("/me", authMiddleware, getMe);

// public
router.get("/", getUsers);

export default router;
