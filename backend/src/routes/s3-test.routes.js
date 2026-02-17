import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const router = express.Router();

router.get("/s3-test", async (req, res) => {
    try {
        const result = await s3.send(new ListBucketsCommand({}));
        res.json({
            message: "S3 connection successful",
            buckets: result.Buckets.map((b) => b.Name),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "S3 connection failed",
            error: error.message,
        });
    }
});

export default router;
