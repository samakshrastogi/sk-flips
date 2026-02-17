import { v4 as uuid } from "uuid";
import prisma from "../utils/prisma.js";
import { uploadToS3 } from "../services/s3.service.js";
import { getSignedCloudFrontUrl } from "../services/cloudfront.service.js";

export const uploadMedia = async (req, res) => {
    try {
        const { channelName, title, mediaType } = req.body;
        const file = req.file;

        if (!file || !channelName || !mediaType) {
            return res.status(400).json({ success: false });
        }

        if (!["video", "icon"].includes(mediaType)) {
            return res.status(400).json({ success: false });
        }

        const ext = file.originalname.split(".").pop();
        const key = `${channelName}/${mediaType}s/${uuid()}.${ext}`;

        await uploadToS3({
            buffer: file.buffer,
            key,
            mimeType: file.mimetype,
        });

        const media = await prisma.media.create({
            data: {
                channelName,
                title: title || file.originalname,
                mediaType,
                s3Key: key,
                mimeType: file.mimetype,
                size: file.size,
            },
        });

        return res.status(201).json({
            success: true,
            media,
        });
    } catch {
        return res.status(500).json({ success: false });
    }
};

export const getMedia = async (req, res) => {
    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: "desc" },
        });

        return res.json({ success: true, media });
    } catch {
        return res.status(500).json({ success: false });
    }
};

export const getMediaStreamUrl = async (req, res) => {
    try {
        const mediaId = req.params.id;

        const media = await prisma.media.findUnique({
            where: { id: mediaId },
        });

        if (!media) {
            return res.status(404).json({ success: false });
        }

        const signedUrl = getSignedCloudFrontUrl(media.s3Key);

        return res.json({
            success: true,
            url: signedUrl,
        });
    } catch {
        return res.status(500).json({ success: false });
    }
};
