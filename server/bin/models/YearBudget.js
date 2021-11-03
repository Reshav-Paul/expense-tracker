"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const YearBudgetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    year: { type: Schema.Types.Number, required: true, unique: true },
    budget: { type: Schema.Types.Number, required: true },
});
YearBudgetSchema.virtual('url').get(function () {
    return '/budgets/year/' + this._id;
});
YearBudgetSchema.pre(/^find/, function (next) {
    let doc = this;
    doc.select('-__v');
    next();
});
let YearBudget = mongoose_1.default.model('YearBudget', YearBudgetSchema);
exports.default = YearBudget;
//# sourceMappingURL=YearBudget.js.map