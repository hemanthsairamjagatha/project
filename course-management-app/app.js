const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost/course_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'process.env.SECRET_KEY',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const indexRoutes = require('./routes/index');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});