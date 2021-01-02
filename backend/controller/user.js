const User =require('../model/user');
const Order =require('../model/order');

const addUser = async(req,res) =>{
    try {
        const objUser=new User(req.body);
        objUser.save(function(err) {
            if(err) {
                res.json({
                    status:404,
                    message:"Failed to add user."
                })
            };
                res.json({
                    status:200,
                    data:objUser,
                    message:"New user add successfully."
                })
        })
    } catch (error) {
        res.send(error);
    }
}

const getUserList=async(req,res)=>{
    try {
        await User.find().exec((err,data)=>{
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

const deleteUser=async(req,res)=>{
    try {
        await User.deleteOne({userId:req.body.user})
        .exec((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.json({
                    status:true,
                    data:data,
                    message:"User delete successfully."
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}

module.exports={
    addUser,getUserList,deleteUser
}