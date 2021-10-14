import { RequestHandler } from 'express';

export let user_signup: RequestHandler = function (req, res, next) {
    res.send('signup');
}

export let user_login: RequestHandler = function (req, res, next) {
    res.send('login');
}

export let user_logout: RequestHandler = function (req, res, next) {
    res.send('logout');
}

export let user_get_by_id: RequestHandler = function (req, res, next) {
    res.send('get by id');
}