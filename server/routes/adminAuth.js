import { createRequire } from 'node:module';
import jwt from 'jsonwebtoken';

const require = createRequire(import.meta.url);
const db = require('../database/database.cjs');

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