"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";
const generateJWT = (id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return jwt;
};
exports.generateJWT = generateJWT;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
