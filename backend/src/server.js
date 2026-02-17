import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

/**
 * Start HTTP server
 */
const server = app.listen(PORT, () => {
  console.log(`🚀 sk-flips backend running on http://localhost:${PORT}`);
});

/**
 * Graceful shutdown (important for production)
 */
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
