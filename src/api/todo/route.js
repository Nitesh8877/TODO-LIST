const express = require('express');
const { createTodo, getAllTodos, getTodoById, deleteTodo, updateTodo, listingTodo, downloadTodosAsCSV, uploadTodosFromCSV } = require('./controller');
const todoRouter = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

todoRouter.route('/').post(createTodo).get(getAllTodos);
todoRouter.route('/list').get(listingTodo);
todoRouter.route('/csv').get(downloadTodosAsCSV);
todoRouter.route('/upload').post(upload.single("file"),uploadTodosFromCSV)

todoRouter.route('/:id').get(getTodoById).delete(deleteTodo).put(updateTodo);


module.exports = todoRouter;
