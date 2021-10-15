import { check } from 'express-validator';

export let validateUserIdInParam = function (req: any, res: any, next: any) {
    if (!check(req.params.id).isMongoId()) {
        res.status(400).json({ error: 'Wrong ID' });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        next();
        return;
    }
    res.status(401).send('Unauthorized');
}