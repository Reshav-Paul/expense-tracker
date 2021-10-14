import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ 'message': 'ExSpender API' });
});

module.exports = router;
