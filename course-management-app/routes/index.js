const express = require('express');
const router = express.Router();

const courseRoutes = require('./courses');
const authRoutes = require('./auth');


router.use('/courses', courseRoutes);

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
    res.render('layout', { title: 'Course Management ' });
});

module.exports = router;