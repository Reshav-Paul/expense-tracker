import { Document } from 'mongoose';
import { Request, Response, NextFunction } from "express";

export type UserType = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type UserUpdateType = {
    firstname?: string,
    lastname?: string,
}

export type mUserType = UserType & Document;
