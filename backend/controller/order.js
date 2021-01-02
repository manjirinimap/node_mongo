const Order=require('../model/order');
const User = require('../model/user');

//add order
const addOrder=async(req,res)=>{
    try {
        const objOrder=new Order(req.body);
        objOrder.save(function(err) {
            if(err) {
              return  res.json({
                    status:404,
                    message:"Failed to add order."
                })
            };
               return res.json({
                    status:200,
                    data:objOrder,
                    message:"New order add successfully."
                })
        })
    } catch (error) {
        res.send(error)
    }
}

//get order list
const getOrderList=async(req,res)=>{
  try {
    await Order.find().exec((err,data)=>{
      if(err){
        res.send(err)
      }else{
        res.json({
          status:true,
          data:data
        })
      }
    })
  } catch (error) {
    res.send(error)
  }
}


//delete record 
const deleteOrder=async(req,res)=>{
  try {
    await Order.deleteOne({orderId:req.body.orderId})
    .exec((err,data)=>{
      if(err){
        res.send(err)
      }else{
        res.json({
          status:true,
          data:data,
          message:"Order delete successfully."
        })
      }
    })
  } catch (error) {
    res.send(error)
  }
}
//get user details
const getUpdateUserList=async(req,res)=>{
  try {
    
    await User.find({}).lean().exec(async(err,data)=>{
      for(let obj of data){
        Order.find({userId:obj.userId}).count().exec(async(err,result)=>{
          const objUser= await User.findOneAndUpdate({userId:obj.userId},{noOfOrder:result}, {useFindAndModify: false});
          const objUpdateUser= await User.find();
          if(objUpdateUser){
            res.json({
              status:true,
              data:objUpdateUser,
              message:"Update successfully."
            })
           }else{
            res.send("failed to update user")
           }
          })
       }
      
    })
    
  } catch (error) {
    res.send(err)
  }
}

//adggreate
const getAverageValue=async(req,res)=>{
  try {
   
    User.aggregate([
          {$lookup:{
              from:"orders",
              localField:"userId",
              foreignField:"userId",
              as:"orderinfo"
              }
          },
          {
              $unwind : "$orderinfo"
          },
          {
              $group:{
                    _id:"$userId",
                    name:{ "$first": "$name" },
                    userId:{"$first": "$userId"},
                    noOfOrders:{"$first": "$noOfOrder"},
                    averageBillValue:{$avg:"$orderinfo.subtotal",
              }}},
        ]).exec((err,data)=>{
              if(err){
               res.send(err)
              }
              else{
                res.json({
                  status:true,
                  body:data
                })
              }})
      } catch (error) {
          res.send(error)
     }
}






module.exports={
  addOrder, getOrderList, getUpdateUserList, getAverageValue,deleteOrder
}