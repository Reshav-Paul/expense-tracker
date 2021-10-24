import { Document, Types } from 'mongoose';

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

export type YearBudgetType = {
    userId: Types.ObjectId,
    year: number,
    budget: number,
}

export type YearBudgetOptionalType = {
    userId?: Types.ObjectId,
    year?: number,
    budget?: number,
}

export type mYearBudgetType = YearBudgetType & Document;