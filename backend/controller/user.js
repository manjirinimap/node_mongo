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



module.exports={addUser}