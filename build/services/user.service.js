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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUserService = exports.insertUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({});
    return users;
});
exports.getUsers = getUsers;
const insertUser = ({ name, password, email }) => __awaiter(void 0, void 0, void 0, function* () {
    const chekEmail = yield User_1.default.findOne({ email });
    if (chekEmail)
        return "Email already exist";
    const passEncrypt = yield (0, bcrypt_handle_1.encrypt)(password);
    const registerUser = yield User_1.default.create({
        name,
        password: passEncrypt,
        email
    });
    return registerUser;
});
exports.insertUser = insertUser;
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById({ id: id });
    return user;
});
exports.getUserService = getUserService;
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIs = yield User_1.default.findOne({ email });
    if (!checkIs)
        return "NOT_FOUND_USER";
    const passwordHash = checkIs.password; //TODO el encriptado!
    const isCorrect = yield (0, bcrypt_handle_1.verified)(password, passwordHash);
    if (!isCorrect)
        return "PASSWORD_INCORRECT";
    const token = (0, jwt_handle_1.generateJWT)(checkIs.email);
    const data = {
        token,
        user: checkIs,
    };
    return data;
});
exports.loginUser = loginUser;
