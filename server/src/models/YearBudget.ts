import mongoose from 'mongoose';

import { mYearBudgetType } from '../utilities/types/types';

const Schema = mongoose.Schema;

const YearBudgetSchema = new Schema({
    userId: Schema.Types.ObjectId,
    year: { type: Schema.Types.Number, required: true },
    budget: { type: Schema.Types.Number, required: true },
});

YearBudgetSchema.virtual('url').get(function (this: mYearBudgetType) {
    return '/budgets/year/' + this._id;
});

YearBudgetSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});

let YearBudget = mongoose.model<mYearBudgetType>('YearBudget', YearBudgetSchema);
export default YearBudget;