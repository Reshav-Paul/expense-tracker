import { Document } from 'mongoose';

export type UserType = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type mUserType = UserType & Document;