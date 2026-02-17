import express from "express";
import cors from "cors";

import prisma from "./utils/prisma.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";

const app = express();

/**
 * Global middlewares
 */
app.use(
    cors({
        origin: "http://localhost:3000", // frontend origin
        credentials: true,
    })
);
app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
    res.json({ message: "sk-flips backend is running 🚀" });
});

/**
 * API routes
 */
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

/**
 * Database test (dev only)
 * You can remove this later
 */
app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database error",
        });
    }
});

/**
 * Global error handler (safety net)
 */
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

export default app;
