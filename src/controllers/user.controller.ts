import { Response, Request } from 'express';
import { getUsers, getUserService, insertUser, loginUser, logoutUser } from '../services/user.service';
import { handleHttp } from '../utils/error.handle';



export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const response = await getUsers();
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_USERS", e);
    }
}

export const getUserController = async ({ params }: Request, res: Response) => {

    try {
        const { id } = params;
        console.log(id)
        const response = await getUserService(id);
        const data = response ? response : "User Not Found";
        res.send(data);
    } catch (e) {
        handleHttp(res, "Error", e)
    }
}

export const loginUserController = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    const responseUser = await loginUser({ email, password });

    if (responseUser === "PASSWORD_INCORRECT") {
        res.status(403);
        res.send(responseUser);
    } else {
        res.send(responseUser);
    }
};

export const logoutUserController = async ({ body }: Request, res: Response) => {
    const { id, token } = body;
    const responseUser = await logoutUser({ id, token });

    if (!responseUser) {
        res.status(403);
        res.send(responseUser);
    } else {
        res.send(responseUser);
    }
};


export const createUserController = async ({ body }: Request, res: Response) => {
    try {
        const userCreated = await insertUser(body);
        res.send(userCreated);
    } catch (e) {
        handleHttp(res, "ERROR_CREATING_USER", e);
    }


}