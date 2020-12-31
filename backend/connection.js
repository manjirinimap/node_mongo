const mongoose=require('mongoose');
const User=require('./model/user');


//connect with db
mongoose.connect('mongodb://localhost:27017/Nimap_test',{ useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(!error){
    console.log("success Connected!!")
    }else{
    console.log("error",error)
    }
});
