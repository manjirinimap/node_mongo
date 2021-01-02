const mongoose = require('mongoose');
var Schema = mongoose.Schema;

orderSchema = new Schema( {
    orderId: {
        type: Number,
        required:true
    },
    userId: {
        type: Number
    },
    subtotal: {
        type: Number,
        required:true
    },
    date: {
        type: String,
        required:true
    }
}),
Order = mongoose.model('orders', orderSchema);
module.exports = Order;


    

