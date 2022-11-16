import { Request, Response, Router } from "express";

const router = Router();


/**
 * https://localhost:3002/users[GET]
 * obtiene todos los uduarios
 */

router.get("/users", (req: Request, res: Response) => {
    res.send({ users: "Envio de todos los usuarios" })
})


export { router };