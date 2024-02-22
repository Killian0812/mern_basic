const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    console.log("Someone seeking users...");

    User.find()
        .then(users => res.json((users.length > 0 ? users : "No user found")))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("Someone adding user...");

    const username = req.body.username;

    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('New User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;