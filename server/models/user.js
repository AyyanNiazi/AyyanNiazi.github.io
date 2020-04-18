const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({

    //For initial testing---
    name:{
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
        type: String
    },
    address:{
        type:String,
        // required:true
    },
    number:{
        type:String,
        // required:true
    }
});
module.exports = mongoose.model('User', User);