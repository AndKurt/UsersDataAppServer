const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/user');
const { send } = require('express/lib/response');

router.get('/user', verify, (req, res) => {
  res.send(req.user);
});

router.delete('/delete', verify, async (req, res) => {
  try {
    const id = req.query.id;
    await User.findOneAndDelete({ _id: id });
    res.send('User deleted');
  } catch (error) {
    res.status(404).send('User not found to delete');
  }
});

router.put('/update', verify, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { isLocked: req.body.isLocked } }
    );
    res.send({
      id: updatedUser._id,
      login: updatedUser.login,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      isLocked: updatedUser.isLocked,
      lastVisit: updatedUser.lastVisit,
      registered: updatedUser.registered,
    });
  } catch (error) {
    res.status(404).send('User not found to update');
  }
});

module.exports = router;
