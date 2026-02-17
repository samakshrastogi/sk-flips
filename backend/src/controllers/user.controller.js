import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ success: true });
    } catch {
        return res.status(500).json({ success: false });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("auth", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        return res.json({ success: true });
    } catch {
        return res.status(500).json({ success: false });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie("auth");
    return res.json({ success: true });
};

export const getMe = async (req, res) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(401).json({ success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(401).json({ success: false });
        }

        return res.json({ success: true, user });
    } catch {
        return res.status(401).json({ success: false });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });

        return res.json({ success: true, users });
    } catch {
        return res.status(500).json({ success: false });
    }
};
