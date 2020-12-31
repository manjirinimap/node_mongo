const Order=require('../model/order');
const User = require('../model/user');

//add order
const addOrder=async(req,res)=>{
    try {
        console.log(req.body)
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

//get updtaed  userlist
const getOrderList=async(req,res)=>{
    try {
      await Order.find({}).lean().exec((err,data)=>{
                //map userid from list
                const arrUserId=data.map(obj=>(obj.userId));

                //remove duplicate id
                const arr = arrUserId.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
                });
              
                //count and update user
                for(let i=0;i<arr.length;i++){
                  //count the record
                      Order.countDocuments({userId:arr[i]},(err,result)=>{
                    if(err){
                        res.send(err)
                    }else{
                      //update and list of the user
                      User.updateOne({userId:arr[i]},{nofOrder:result},()=>{});
                      User.find({}).lean().exec((err,user)=>{
                        if(err){
                          res.send(err)
                        }else{
                          res.json({
                            status:200,
                            data:user,
                            message:"successfully updated."
                          })
                        }
                      });
                    }
                  })
                }
      })
    } catch (error) {   
        res.send(error)
    }
}

//get user details
const getOrderDetails=async(req,res)=>{
        try {
            await Order.find()
            .select("orderId userId subtotal date")
            .populate('userObjectId')
            .exec()
            .then((data)=>{
              //sum of total 
                const arrTotal = Array.from(
                    data.reduce((a,{userId,subtotal})=>{
                      return a.set(userId, (a.get(userId)||0) + subtotal);
                    }, new Map())
                  ).map(([userId,sum])=>({userId,sum}));
                
              //fetch user list
              User.find({}).lean().exec((err,result)=>{
                if(err){
                  res.send(err)
                }else{
                  const merge = (arr1, arr2) => {
                    const temp = []
                  
                    arr1.forEach(x => {
                      arr2.forEach(y => {
                        if (x.userId === y.userId) {
                          temp.push({ ...x, ...y })
                        }
                      })
                    })
                    return temp
                  }
                  const arrgg=(merge(arrTotal, result));
                  const arrNewUser=[];
                  for(let obj of arrgg){
                    arrNewUser.push({
                      userId:obj.userId,
                      name:obj.name,
                      noOfOrder:obj.noOdOrder,
                      averageBillValue:obj.sum/obj.noOfOrder
                    })
                  }
                  res.send(arrNewUser)
                }
              })
               
               });
        } catch (error) {
            res.send(error)
        }
}



module.exports={
      addOrder,getOrderList,getOrderDetails
}