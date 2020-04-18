const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreInfo = new Schema({

    //For initial testing---
    storeId: {
        type:String,
        required: true
    },
  storeInfo: Array,

  products: Array,

  storeStatus: {
    type:String,
    required: true
  }

//   products: Array
});
module.exports = mongoose.model('StoreInfo', StoreInfo);