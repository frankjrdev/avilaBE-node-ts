import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

export const generateJWT = (id: string) => {
    const jwt = sign({ id }, JWT_SECRET, {
        expiresIn: "1h",
    })
    return jwt;
}

export const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};