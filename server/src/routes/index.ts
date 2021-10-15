import { Router } from 'express';
var indexRouter = Router();

/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  res.json({ 'message': 'ExSpender API' });
});

export default indexRouter;
