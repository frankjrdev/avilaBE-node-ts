import { hash, compare } from "bcryptjs";


export const encrypt = async (pass: string) => {
    const passEncrypt = await hash(pass, 8);
    return passEncrypt
}

export const verified = async (pass: string, passHash: string) => {
    const isCorrect = await compare(pass, passHash);
    return isCorrect;
};