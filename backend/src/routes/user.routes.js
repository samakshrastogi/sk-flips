import express from "express";
import {
    registerUser,
    loginUser,
    getUsers,
    getMe,
    logoutUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", getMe);
router.get("/", getUsers);

export default router;
