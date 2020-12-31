const mongoose = require('mongoose');
const orderData=require('./order');
const dataService = require('../service');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	userId: {
        type:Number,
        required:true
    },
	name: {
        type:String,
        required:true,
    },
	noOfOrder:{
        type:Number,
        required:true,
        default:0
    }
}),
User = mongoose.model('User', userSchema);

module.exports = User;


    

