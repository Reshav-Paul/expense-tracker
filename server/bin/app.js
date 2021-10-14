"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let app = (0, express_1.default)();
mongoose.connect(process.env.mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('returnOriginal', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/user', usersRouter);
let defaultHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send(err.message);
    res.send(req.app.get('env'));
};
app.use(defaultHandler);
// module.exports = app;
exports.default = app;
//# sourceMappingURL=app.js.map