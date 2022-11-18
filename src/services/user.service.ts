import UserModel from '../models/User';
import { User } from '../interfaces/user.interface';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateJWT } from '../utils/jwt.handle';
import { Auth } from '../interfaces/auth.interfaces';
import UserJWTModel from '../models/UserJWT';



export const getUsers = async () => {
    return UserModel.find({});
}

export const insertUser = async ({ name, password, email }: User) => {
    const chekEmail = await UserModel.findOne({ email });
    if (chekEmail) return "Email already exist";
    const passEncrypt = await encrypt(password);
    const registerUser = await UserModel.create({
        name,
        password: passEncrypt,
        email
    })
    return registerUser;
}

export const getUserService = async (id: string) => {
    return UserModel.findById(id);
}

export const loginUser = async ({ email, password }: Auth) => {
    const user = await UserModel.findOne({ email });
    if (!user) return "NOT_FOUND_USER";

    const passwordHash = user.password; //TODO el encriptado!
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) return "PASSWORD_INCORRECT";

    const token = generateJWT(user.id);
    const idUser = user.id
    const userAuth = await UserJWTModel.create({ idUser, token });
    const data = {
        token,
        user,
        userAuth
    };
    return data;
};

export const logoutUser = async ({ id, token }: any) => {

    const userNoToken = await UserJWTModel.findOneAndUpdate({ id, token: "" });
    const response = {
        userNoToken
    }
    return response;
};