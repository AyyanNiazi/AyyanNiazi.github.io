const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSignup = new Schema({

    //For initial testing---
    fname:{
        type:String,
    },
    lname: {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type: String,
        default: 'vendor'
    },   
    storeName: {
        type: String
    },
    number:{
        type:String,
        // required:true
    }
});
module.exports = mongoose.model('VendorSignup', VendorSignup);