const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserCart = new Schema({

        userId: String,
        products: Array,
        name: String,
        price: Number,
        quantity:Number

});
module.exports = mongoose.model('UserCart',UserCart);