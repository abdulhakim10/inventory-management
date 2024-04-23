const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");
const e = require("express");
/**
 * 1. check if token is exist
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1];

        if(!token) {
            return res.status(401).json({
                status: "failed",
                message: "You are not logged in"
            });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        // const user = await User.findOne({email: decoded.email});
        // req.user = user;

        next();
    } catch (error) {
        res.status(403).json({
            status: "failed",
            message: "Invalid token"
        })
    }
}