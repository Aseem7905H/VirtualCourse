import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("token:", token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: `isAuth Authentication error: ${error.message}` });
    }
};

export default isAuth;
