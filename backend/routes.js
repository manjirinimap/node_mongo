const express =require('express');
const router =express.Router();
const userRouter =require('./routes/user');
const orderRouter =require('./routes/order');

router.use('/user',userRouter);
router.use('/order',orderRouter);

module.exports = router;