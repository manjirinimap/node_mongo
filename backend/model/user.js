const mongoose = require('mongoose');
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
User = mongoose.model('users', userSchema);
module.exports = User;


    

