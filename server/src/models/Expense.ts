import mongoose from 'mongoose';

import { mExpenseType } from '../utilities/types/types';

const Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
});

ExpenseSchema.virtual('url').get(function (this: mExpenseType) {
    return '/expense/' + this._id;
});

ExpenseSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});

let ExpenseBudget = mongoose.model<mExpenseType>('Expense', ExpenseSchema);
export default ExpenseBudget;