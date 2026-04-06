import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Accept token from Authorization header (Bearer <token>) or custom token header 'token'
    let token = req.headers["authorization"] || req.headers["token"];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Not Authorized Login Again" });
    }

    // If header is in the form 'Bearer <token>', extract the token part
    if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
