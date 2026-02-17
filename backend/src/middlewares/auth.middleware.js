import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(401).json({
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            success: false,
        });
    }
};

export default authMiddleware;
