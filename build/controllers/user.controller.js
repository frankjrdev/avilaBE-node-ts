"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.loginUserController = exports.getUserController = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const error_handle_1 = require("../utils/error.handle");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_service_1.getUsers)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_USERS", e);
    }
});
exports.getAllUsers = getAllUsers;
const getUserController = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(params);
    try {
        const { id } = params;
        console.log(id);
        const response = yield (0, user_service_1.getUserService)(Number(id));
        const data = response ? response : "User Not Found";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "Error", e);
    }
});
exports.getUserController = getUserController;
const loginUserController = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const responseUser = yield (0, user_service_1.loginUser)({ email, password });
    if (responseUser === "PASSWORD_INCORRECT") {
        res.status(403);
        res.send(responseUser);
    }
    else {
        res.send(responseUser);
    }
});
exports.loginUserController = loginUserController;
const createUserController = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield (0, user_service_1.insertUser)(body);
        res.send(userCreated);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, "ERROR_CREATING_USER", e);
    }
});
exports.createUserController = createUserController;
