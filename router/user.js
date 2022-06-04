const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/user');

router.get('/user', verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
