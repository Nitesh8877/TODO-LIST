const express = require('express');
const authRouter = require('../api/auth/route');
const UserRouter = require('../api/user/route');
const Router = express.Router();

// Mounting authRouter and UserRouter
Router.use('/api/login', authRouter);
Router.use('/api/add', UserRouter);

module.exports = Router;
