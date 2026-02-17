import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";
import {
    uploadMedia,
    getMedia,
    getMediaStreamUrl,
} from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", getMedia);

router.get(
    "/:id/stream-url",
    authMiddleware,
    getMediaStreamUrl
);

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadMedia
);

export default router;
