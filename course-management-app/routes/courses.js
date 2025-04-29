const express = require('express');
const router = express.Router();
const Course = require('../models/course');
router.get('/new', (req, res) => {
    res.render('courses/new');
});

router.post('/', async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.redirect('/courses');
    } catch (error) {
        res.render('courses/new', { error: error.message });
    }
});

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.render('courses/index', { courses });
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('courses/show', { course });
});
router.get('/:id/edit', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('courses/edit', { course });
});

router.put('/:id', async (req, res) => {
    const { price, image, duration, courseStartDate } = req.body;
    try {
        await Course.findByIdAndUpdate(req.params.id, { price, image, duration, courseStartDate });
        res.redirect(`/courses/${req.params.id}`);
    } catch (error) {
        res.render('courses/edit', { course: req.body, error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/courses');
});

module.exports = router;