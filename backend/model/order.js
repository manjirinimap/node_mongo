const mongoose = require('mongoose');
var Schema = mongoose.Schema;

orderSchema = new Schema( {
    orderId: {
        type: Number,
        required:true
    },
    userId: {
        type: Number,
        ref: 'User',
        required: true
    },
    subtotal: {
        type: Number,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    userObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}),
Order = mongoose.model('Order', orderSchema);
module.exports = Order;


    

