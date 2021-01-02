const express =require('express');
const orderRouter=express.Router();
const orderController=require('../controller/order');

orderRouter.post('/add-order',orderController.addOrder);

orderRouter.get('/get-order-list',orderController.getOrderList);

orderRouter.delete("/delete-order",orderController.deleteOrder);

orderRouter.post('/get-update-list',orderController.getUpdateUserList);

orderRouter.post('/get-average-list',orderController.getAverageValue);



module.exports=orderRouter;