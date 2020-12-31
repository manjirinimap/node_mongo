const express =require('express');
const userRouter= express.Router();
const userController=require('../controller/user');

userRouter.post('/add-user',userController.addUser);


module.exports = userRouter;