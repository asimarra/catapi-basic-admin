const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

const indexRouter = require('./src/routes/index.js');
const authRouter = require('./src/components/auth/authAPI');
const userRouter = require('./src/components/users/usersAPI');
const notifyRouter = require('./src/components/notify/notifyAPI');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/notify', notifyRouter);

module.exports = app;
