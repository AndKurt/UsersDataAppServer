const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

//REGISTER
router.post('/register', async (req, res) => {
  //Validate date before make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in the database
  const loginExist = await User.findOne({ login: req.body.login });
  const emailExist = await User.findOne({ email: req.body.email });
  if (loginExist || emailExist)
    return res.status(400).send(loginExist ? 'Login already exists' : 'Email already exists');

  //Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    login: req.body.login,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      id: savedUser._id,
      login: savedUser.login,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      isLocked: savedUser.isLocked,
      registered: savedUser.registered,
      lastVisit: savedUser.lastVisit,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  //Validate date before make a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the login exists
  const user = await User.findOneAndUpdate(
    { login: req.body.login },
    { $set: { lastVisit: Date.now() } }
  );
  if (!user) return res.status(400).send('Login is not found');
  //Password is correct
  const validPass = await bcryptjs.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
