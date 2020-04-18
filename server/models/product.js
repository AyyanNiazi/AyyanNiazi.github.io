const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({

        name:{
                type:String,
                // required:true
        },
        description:{
                type:String,
                // required:true
        },
        price:{
                type:Number,
                // required:true
        },
        discountedPrice:String,
        sizes:Array,
        colors:Array,
        inventory :Array,
        category:String,
        date:String,
        time:String,
        storeId:String,
        storeName:String,
        keywords:Array,
        initialDate:String,
        lastDate:String,   
        selectedCategory:String,
        selectedCategoryS:String,
        selectedCategoryT:String,
        productStatus:String,
        sku:String,
        threshhold:String,
        inventoryQuantity:String,
        upSellProduct:Array,
        crSellProduct:Array,
        mQuantity:String,
        pDiscount:String, 
        image: Array,
        imageId: Array,
        // img:{
        //        title:String,
        //        image:String,
        //        imageId:String
        // }

});
module.exports = mongoose.model('Product',Product);