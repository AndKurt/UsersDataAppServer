const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/user');

router.get('/users', verify, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('Something went wrong!');
      next();
    }
    res.json(users);
  });
});

module.exports = router;
