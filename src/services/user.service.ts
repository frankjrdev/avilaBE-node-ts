import UserModel from '../models/User';
import { User } from '../interfaces/user.interface';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateJWT } from '../utils/jwt.handle';



export const registerNewUser = async ({ name, password, email }: User) => {
    const chekEmail = await UserModel.findOne({ email });
    if (chekEmail) return "User already exist";
    const passEncrypt = await encrypt(password);
    const registerUser = await UserModel.create({
        name,
        password: passEncrypt,
        email
    })
    return registerUser;
}

export const getUserService = async (id: number) => {
    const user = await UserModel.findById({ id: id });
    return user;
}

export const loginUser = async ({ email, password }: User) => {
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