import { Response, Request } from 'express';
import { getUserService } from '../services/user.service';
import { handleHttp } from '../utils/error.handle';



export const getUser = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getUserService(Number(id));
        const data = response ? response : "User Not Found";
        res.send(data);
    } catch (e) {
        handleHttp(res, "")
    }
}