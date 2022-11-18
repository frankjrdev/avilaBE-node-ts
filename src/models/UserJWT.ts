import { Schema, model } from "mongoose";
import { User } from '../interfaces/user.interface';
import { UserAuth } from '../interfaces/userAuth';


const UserJWTSchema = new Schema<UserAuth>(
    {
        idUser: {
            type: String,
            required: true
        },
        token: {
            type: String
        }
    }
)

const UserJWTModel = model("userAuth", UserJWTSchema);
export default UserJWTModel;