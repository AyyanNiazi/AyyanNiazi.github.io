const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
const PendingProduct = require('../../models/admin/pending');
const StoreInfo = require('../../models/vendor/storeInfo');
//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
filename: function(req, file, callback) {
callback(null, Date.now() + file.originalname);
}
});
const imageFilter = function(req, file, cb) {
// accept image files only
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
return cb(new Error("Only image files are accepted!"), false);
}
cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
const cloudinary = require("cloudinary");
cloudinary.config({
cloud_name: "dbevearco", //ENTER YOUR CLOUDINARY NAME
api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});

module.exports = {
    
    getAdminUsers(req, res){

        User.findById().exec((err, users) => {
            if(err){
                console.log('getAdminUsers err-----------:',err);
            }
            res.status(200).send(users);
        });
    },
    // async createProduct(req, res){
    

    productApprovals(req,res){
        const {productStatus,id} = req.body;

        Product.findById(id)
        .then(data => {
            data.productStatus=productStatus
            data.save()
            .then(fdata => {
                res.status(200).send(fdata)
            })
            .catch(err => {
                res.status(400).send(err.message)
                
            })
        })
        .catch(err => {
            res.status(400).send(err.message)
            
        })
        
    },

    // updateProduct(req, res){

    //     // const { id } = req.params;
    //     const { name, id, price,stock } = req.body;
    //     console.log(req.body)
    //     Product.findById(id).exec((err, product)=>{
    //         product.name=name;
    //         product.stock=stock;
    //         product.price=price;
    //         product.save().then(()=>{
    //             res.status(200).json({product})
    //         })
    //     })

    // },
    deleteProduct(req, res){

        const { key, imageId } = req.body;
        console.log(key)
        Product.findByIdAndDelete(key)
        .then(cart => {cart.remove().then(() => {
            cloudinary.v2.uploader.destroy(imageId, function(error,result) {
                if(error){
                    console.log('Destroy image=======',error)
                } 
                console.log('Destroy image=======',result)
                res.json({ success: true,cart })
            });
        })})
        .catch(err => res.status(404).json({ success: false }));
    },

    pendingProduct(req, res) {
        const {name, description, quantity,user,price} = req.body;

        PendingProduct.find().exec((err,product) => {
            if(err){
             res.status(400).json({success:false,err})
            }
            else
            res.status(200).json({success:true,product})
        })

    },

    bookedProduct(req,res){
        
        Proceed.find()
        .then(data => res.status(200).json({data}))
        .catch(err => err.json)
    },
    
    getStock(req,res){
        Product.find().then(product=>{
            res.status(200).json({success:true,product})
        }).catch(err=>{
            res.status(400).json({success:false,err})
        })
    },
    cartOwner(req,res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,} = req.body
        console.log(req.body)
        var crtProduct=[];
        // var productData=cartProducts.filterProduct
        cartProducts.forEach(i => {
            crtProduct.push({
                name:i.filterProduct.name,
                price:i.filterProduct.price,
                stock:i.filterProduct.stock,
                productId:i.filterProduct._id,
                quantity:i.quantity})
            
        })

        let newProceed = new Proceed({
            fname,
            lname,
            city,
            address,
            appartment,
            number,
            timeStamp,
            cartProducts: crtProduct
              
        });

        console.log('Anday wala burger',crtProduct)
        newProceed.save().then(data=>{
            console.log('Anday wala burger',data)
            res.status(200).json({success:true, data})
        })
        .catch(err => {
            console.log('ksadkjhsakj-------',err.message)
            res.status(404).json({success:false,err})
        });
    },

   

    updateStatus(req,res){
        const {storeStatus,storeId} = req.body;
        console.log(storeStatus);

        StoreInfo.findByIdAndUpdate(storeId,{storeStatus:storeStatus})
        .then(data => {
            console.log(data)
            res.status(200).send(storeStatus)
        })
        .catch(err => {
            console.log(err.message)
            res.status(200).send(err.message)

        })
        

    },
    
    getStore(req,res){
        StoreInfo.find()
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).send(err.message)
        })
    }
    
}

