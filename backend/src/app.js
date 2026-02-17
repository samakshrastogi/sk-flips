import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "sk-flips backend is running 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

export default app;
