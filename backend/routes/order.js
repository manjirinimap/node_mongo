const express =require('express');
const orderRouter=express.Router();
const orderController=require('../controller/order');

orderRouter.post('/add-order',orderController.addOrder);

orderRouter.post('/get-user-list',orderController.getOrderList);

orderRouter.post('/get-user-details',orderController.getOrderDetails);



module.exports=orderRouter;