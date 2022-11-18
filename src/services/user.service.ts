import UserModel from '../models/User';
import { User } from '../interfaces/user.interface';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateJWT } from '../utils/jwt.handle';
import { Auth } from '../interfaces/auth.interfaces';



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
    const checkIs = await UserModel.findOne({ email });
    if (!checkIs) return "NOT_FOUND_USER";

    const passwordHash = checkIs.password; //TODO el encriptado!
    const isCorrect = await verified(password, passwordHash);

    if (!isCorrect) return "PASSWORD_INCORRECT";

    const token = generateJWT(checkIs.email);
    const data = {
        token,
        user: checkIs,
    };
    return data;
};

export const logoutUser = async ({ id, token }: any) => {

    const checkIs = await UserModel.findByIdAndUpdate(id, { token: "fsdgsdfgsdfg" });
    const userUpdate = await UserModel.findById(id);
    if (!checkIs) return "NOT_FOUND_USER";
    const data = {
        userUpdate
    };
    return data;
};