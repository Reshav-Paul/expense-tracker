"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var indexRouter = (0, express_1.Router)();
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
    res.json({ 'message': 'ExSpender API' });
});
exports.default = indexRouter;
//# sourceMappingURL=index.js.map