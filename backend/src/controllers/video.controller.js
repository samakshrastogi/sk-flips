import fs from "fs";
import path from "path";
import prisma from "../utils/prisma.js";

/**
 * Upload video (protected)
 */
export const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No video file uploaded",
            });
        }

        const { title, description } = req.body;

        const video = await prisma.video.create({
            data: {
                title: title || req.file.originalname,
                description,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
                ownerId: req.user.userId,
            },
        });

        return res.status(201).json({
            success: true,
            video,
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};

/**
 * Get all videos (public)
 * GET /api/videos
 */
export const getVideos = async (req, res) => {
    try {
        const videos = await prisma.video.findMany({
            select: {
                id: true,
                title: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json({
            success: true,
            videos,
        });
    } catch (error) {
        console.error("FETCH VIDEOS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch videos",
        });
    }
};

/**
 * Stream video with HTTP Range support
 * GET /api/videos/:id/stream
 */
export const streamVideo = async (req, res) => {
    try {
        const videoId = Number(req.params.id);

        const video = await prisma.video.findUnique({
            where: { id: videoId },
        });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        const videoPath = path.join("uploads/videos", video.filename);

        if (!fs.existsSync(videoPath)) {
            return res.status(404).json({
                success: false,
                message: "Video file not found",
            });
        }

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunkSize = end - start + 1;
            const file = fs.createReadStream(videoPath, { start, end });

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": video.mimetype,
            });

            file.pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": video.mimetype,
            });

            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        console.error("STREAM ERROR:", error);
        res.status(500).end();
    }
};
