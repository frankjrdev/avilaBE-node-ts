import { Router } from "express";
import { loginUserController, getUserController, createUserController, getAllUsers, logoutUserController } from '../controllers/user.controller';

const routerUser = Router();

/**
 * https://localhost:3002/users[GET]
 * obtiene todos los uduarios
 */

routerUser.get("/user/all", getAllUsers);

routerUser.get('/user/:id', getUserController);

routerUser.post('/user/createUser', createUserController);

routerUser.post('/user/sigin', loginUserController);

routerUser.post('/user/sigout', logoutUserController);

export { routerUser };
