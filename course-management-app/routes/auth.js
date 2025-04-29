const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    const { gender, number } = req.body;
    const newUser = new User({ gender, number });

    newUser.save()
        .then(() => {
            req.flash('success_msg','register');
            res.redirect('/login');
        })
        .catch(err => {
            req.flash('error_msg', 'Error registering user');
            res.redirect('/register');
        });
});


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/courses',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'logged out');
    res.redirect('/login');
});

module.exports = router;