"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ExpenseSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
});
ExpenseSchema.virtual('url').get(function () {
    return '/expense/' + this._id;
});
ExpenseSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});
let ExpenseBudget = mongoose_1.default.model('Expense', ExpenseSchema);
exports.default = ExpenseBudget;
//# sourceMappingURL=Expense.js.map