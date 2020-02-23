const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');
const authorize = require('./authenticate-middleware.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', authorize, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then( user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`, token: token
        })
      } else {
        res.status(401).json({ message: "Invalid Login Credentials "});
      }
    })
    .catch( error => {
      res.status(500).json(error);
    })
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '8h'
  };
  const token = jwt.sign(payload, secrets.jwtSecret, optiosn)
  return token;
}

module.exports = router;
