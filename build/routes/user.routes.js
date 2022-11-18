"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
/**
 * https://localhost:3002/users[GET]
 * obtiene todos los uduarios
 */
routerUser.get("/users", user_controller_1.getAllUsers);
routerUser.get('/:id', user_controller_1.getUserController);
routerUser.post('/createUser', user_controller_1.createUserController);
routerUser.post('/login', user_controller_1.loginUserController);
