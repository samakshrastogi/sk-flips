import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
console.log(process.env.CLOUDFRONT_PRIVATE_KEY.includes("\\n"));

const prisma = new PrismaClient();

export default prisma;
