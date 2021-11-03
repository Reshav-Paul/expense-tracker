import mongoose from 'mongoose';

import { mMonthBudgetType } from '../utilities/types/types';

const Schema = mongoose.Schema;

let MonthBudgetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    month: { type: Schema.Types.Number, required: true },
    year: { type: Schema.Types.Number, required: true },
    budget: { type: Schema.Types.Number, required: true }
});

MonthBudgetSchema.virtual('url').get(function (this: mMonthBudgetType) {
    return '/budgets/month/' + this._id;
});

MonthBudgetSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});

let MonthBudget = mongoose.model<mMonthBudgetType>('MonthBudget', MonthBudgetSchema);
export default MonthBudget;