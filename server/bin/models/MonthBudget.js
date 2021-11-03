"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MonthBudgetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    month: { type: Schema.Types.Number, required: true },
    year: { type: Schema.Types.Number, required: true },
    budget: { type: Schema.Types.Number, required: true }
});
MonthBudgetSchema.virtual('url').get(function () {
    return '/budgets/month/' + this._id;
});
MonthBudgetSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});
let MonthBudget = mongoose_1.default.model('MonthBudget', MonthBudgetSchema);
exports.default = MonthBudget;
//# sourceMappingURL=MonthBudget.js.map