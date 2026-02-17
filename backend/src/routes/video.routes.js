import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { uploadVideo as uploadMiddleware } from "../utils/multer.js";
import {
    uploadVideo,
    getVideos,
} from "../controllers/video.controller.js";

const router = express.Router();

/**
 * PUBLIC
 * Get all videos (used by frontend VideoList)
 * GET /api/videos
 */
router.get("/", getVideos);

/**
 * PROTECTED
 * Upload a new video
 * POST /api/videos/upload
 */
router.post(
    "/upload",
    authMiddleware,
    uploadMiddleware.single("video"),
    uploadVideo
);

export default router;
