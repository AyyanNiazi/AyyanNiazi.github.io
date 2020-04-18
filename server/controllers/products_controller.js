const Product = require('../models/product');

module.exports = {

    readAllProducts(req, res){

        // Product.find({"_id":"5e510985d58ddc1ae0539c22"}).select('products') .exec((err,data)=>{
        //     console.log('product',data)
        // })


        Product.find({}).exec((err, products)=>{
            if(err){
                console.log('All products err--------',err);
            }
            // console.log('Products Find====',products.reverse())
            res.status(200).send(products.reverse());
        })

    },
    readProduct(req, res){

        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if(err){
                console.log('Product err----------',err);
            }
            res.status(200).send({product});
        })

    }
}