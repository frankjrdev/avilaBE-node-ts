import { Request, Response, Router } from "express";
import { getUser } from "../controllers/user.controller";

const router = Router();

/**
 * https://localhost:3002/users[GET]
 * obtiene todos los uduarios
 */

router.get("/users", (_req: Request, res: Response) => {
    res.send({ users: "Envio de todos los usuarios" });
});

router.get('/:id', getUser);

export { router };
