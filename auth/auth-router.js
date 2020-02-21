const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const usersModel = require('../users/users-model');

const router = express.Router();

// user register
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  usersModel
    .add(user)
    .then(saved => {
      res.status(201).json({ created_user: saved });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// user login route
router.post('/login', async (req, res, next) => {
  try {
    let { username, password } = req.body;

    const user = await usersModel.findBy({ username }).first();
    console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.status(202).json({
        message: `Welcome ${user.username}!`,
        token: token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

// create token helper function
function signToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
