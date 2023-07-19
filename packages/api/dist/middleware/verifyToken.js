import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(401).json("Unauthorize user");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Invalid Credentials received" });
    }
}
//# sourceMappingURL=verifyToken.js.map