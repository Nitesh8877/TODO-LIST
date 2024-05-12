const express = require('express');
const todoRouter = require('../api/todo/route');
const Router = express.Router();

module.exports = Router;

Router.use('/todos',todoRouter)