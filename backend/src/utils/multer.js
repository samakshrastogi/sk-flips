import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Absolute upload directory
 * (prevents path bugs on Windows/Linux)
 */
const uploadDir = path.join(process.cwd(), "uploads", "videos");

/**
 * Ensure upload directory exists
 */
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Storage configuration
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${ext}`;

        cb(null, uniqueName);
    },
});

/**
 * Only allow video files
 */
const fileFilter = (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(
            new Error("Invalid file type. Only video files are allowed."),
            false
        );
    }
};

/**
 * Export multer middleware
 */
export const uploadVideo = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 1024, // 1 GB
    },
});
