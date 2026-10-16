import jwt from 'jsonwebtoken';
import db from "../database/database.js"

export function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(404);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = db.prepare(
            'SELECT userID, name, userType FROM User WHERE name = ?'
        ).get(decoded.name);

        if (!user) {
            return res.sendStatus(401);
        }

        if (user.userType !== 'admin') {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}