const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => res.send(err));
});

module.exports = router;