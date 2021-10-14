"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var router = (0, express_1.Router)();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ 'message': 'ExSpender API' });
});
module.exports = router;
//# sourceMappingURL=index.js.map