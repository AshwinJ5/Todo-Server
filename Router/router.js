const express = require('express');
const router = new express.Router();
const userController = require('../Controller/userController');
const todoController = require('../Controller/todoController');
const jwtMiddleware = require('../Middlewares/jwt');

// registration
router.post('/register', userController.register);

// login
router.post('/login', userController.login);

// getUserData
router.get('/profile/:id',jwtMiddleware, userController.getAUserData);

// create new
router.post('/tasks',jwtMiddleware, todoController.addNewTodo);

// get users todo
router.get('/tasks/:id',jwtMiddleware, todoController.getAllTodosOfaUser);

// delete todo
router.delete('/tasks/:id',jwtMiddleware, todoController.deleteATodo);

// update todo
router.put('/tasks/:id',jwtMiddleware, todoController.updateATodoDetails);

// update todo
router.patch('/tasks/:id/status',jwtMiddleware, todoController.updateATodoStatus);

module.exports = router;