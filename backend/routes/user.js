const express =require('express');
const userRouter= express.Router();
const userController=require('../controller/user');

userRouter.post('/add-user',userController.addUser);

userRouter.get('/get-user-list',userController.getUserList);

userRouter.delete('/delete-user',userController.deleteUser);


module.exports = userRouter;