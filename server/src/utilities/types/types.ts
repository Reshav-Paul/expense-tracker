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

export type MonthBudgetType = {
    userId: Types.ObjectId,
    year: number,
    month: number,
    budget: number,
}

export type MonthBudgetOptionalType = {
    userId?: Types.ObjectId,
    year?: number,
    month?: number,
    budget?: number,
}

export type mMonthBudgetType = MonthBudgetType & Document;

export type ExpenseType = {
    name: string,
    amount: number,
    date: string,
    userId: Types.ObjectId,
}

export type ExpenseOptionalType = {
    name?: string,
    amount?: number,
    userId?: Types.ObjectId,
    date?: string,
}

export type mExpenseType = ExpenseType & Document;