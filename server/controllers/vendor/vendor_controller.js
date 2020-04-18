const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const VendorSignup = require('../../models/vendor/vendorSignup');
const StoreInfo = require('../../models/vendor/storeInfo');
const Product = require('../../models/product');
const validateRegisterInput = require('../../validation/register');
const validateInformationInput = require('../../validation/information');
const validateLoginInput = require('../../validation/login');



let log = console.log
module.exports = {
   
    signup(req,res){
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
            if (!isValid) {
            return res.status(400).json(errors);
            }
        VendorSignup.findOne({ email: req.body.email }).then(user => {
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            console.log('findOne bad: ');
            
            } else {
              const newVendor = new VendorSignup({
                email: req.body.email,
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname,
                number: req.body.number,
                storeName: req.body.storeName,
                // userType: 'vendor',

              });
        // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                  if (err) throw err;
                  newVendor.password = hash;
                  newVendor
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));
                });
              });
            }
          }).catch(err=> console.log(err));
        
    },

    vendorLogin(req, res){
        console.log('Login: ',req)
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const email = req.body.email;
            const password = req.body.password;
            // const userType = req.body.userType;
            // Find user by email
            VendorSignup.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                return res.status(404).json({ loginEmailnotfound: "Email not found" });
                }
            // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // console.log("userID: ",user.id)
        
                    // User matched
                    // Create JWT Payload
                    const payload = {
                    id: user.id,
                    name: user.name,
                    // userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                    );
                } else {
                    return res
                    .status(400)
                    .json({ loginPasswordincorrect: "Password incorrect" });
                }
                });
            });
    },
    
    // getVendorStore(req,res){
    //     const {id} = req.body
    //     StoreInfo.findById(id)
    //     .then(data => {
    //         console.log(data)
    //         res.status(200).send(data)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //         res.status(200).send(err.message)
    //     })

    // },

    getStore(req,res){
        const {id} = req.params
        console.log(id)
        StoreInfo.find({storeId:id})
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })
    },

    getProducts(req,res){
        const {id} = req.params
        console.log(id)
        // let id = {id}
        Product.find({storeId:id})
        .then(data => {
            console.log('Data Vendor ki products',data)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })
    },
    
    createStore(req,res){
        // const {storeInfo} = req.body
        log(req.body)
        let storeInfo = req.body
        let storeId = storeInfo[storeInfo.length-1].storeId

        // storeInfo.forEach(element => {
        //     if(element.storeId){
        //         return storeId = storeId
        //     }
        // });

        // StoreInfo.find()
        let newStore = new StoreInfo({
            storeInfo,
            storeId,
            storeStatus: 'pending',
            date: new Date()
        })

        newStore.save()
        .then(data => {
            res.status(200).send(data)
            log(data)

        })
        .catch(err => {
            log(err.message)
            res.status(400).send(err.message)
        })
    },

    addProduct(req, res){

        const { name,storeName,keywords, storeId,description,price,prodInfo,initialDate,lastDate,
            sku,threshhold,inventoryQuantity,upSellProduct,crSellProduct,mQuantity,pDiscount,  discountedPrice,
            selectedCategory, selectedCategoryS,selectedCategoryT } = req.body;
         console.log(req.body);
         let date = new Date().toLocaleDateString();
         let time = new Date().toLocaleTimeString();
 
        let newproduct = new Product ({ name, description,price,inventory:prodInfo,initialDate,lastDate, discountedPrice,
                                        selectedCategory,selectedCategoryS,selectedCategoryT,productStatus:'pending',date,
                                        time,storeName,storeId,keywords,sku,threshhold,inventoryQuantity,upSellProduct,crSellProduct,mQuantity,
                                        pDiscount,  }) 
 

             
        newproduct.save()
             .then(data => {
                 console.log(data)
                 res.status(200).send(data)
             })
             .catch(err => {
                 console.log(err.message)
                 res.status(400).send(err.message)
             })

         // req.body.image=[]
         // req.body.imageId=[]
         // console.log('rquest body',req.body)
         // console.log('/add called====', req.files)
         // for(let i=0;i<req.files.length;i++){
         // console.log('loop----',i,'--')
         //    await cloudinary.v2.uploader.upload(req.files[i].path, function(err, result) {
         //       if (err) {
         //         res.json(err.message);
         //       }
               
         //       req.body.image.push(result.secure_url);
         //       console.log('Secure URL=====-=-=-=-',result.secure_url,[i],req.body.image)
         //       // add image's public_id to image object
         //       req.body.imageId.push(result.public_id);
         //     })
             
         // }
         // console.log('After for loop=-=-=-=-')
         //     Product.create(req.body, function(err, result) {
         //         if (err) {
         //           res.json(err.message);
         //           return res.redirect("/");
         //         }
         //         console.log('res send',result)
         //         res.status(200).json({Product:result})
         //       });
     },

      updateProduct(req, res){

        const { name,storeName,keywords,prodId, storeId,
            description,price,prodInfo,initialDate,lastDate, discountedPrice,selectedCategory,
            selectedCategoryS,selectedCategoryT,sku,threshhold,inventoryQuantity,
            upSellProduct,crSellProduct,mQuantity,pDiscount,  } = req.body;

        // const { name, id, price,stock } = req.body;
        console.log(req.body)
        Product.findById(prodId).exec((err, product)=>{
         if(err){
             console.log(err.message);
             return res.status(400).send(err.message)
         }
            product.name=name;
            product.price=price;
            product.keywords=keywords;
            product.initialDate=initialDate;
            product.lastDate=lastDate;
            product.prodInfo=prodInfo;
            product.description=description;
            product.sku=sku;
            product.threshhold=threshhold;
            product.inventoryQuantity=inventoryQuantity;
            product.upSellProduct=upSellProduct;
            product.mQuantity=mQuantity;
            product.crSellProduct=crSellProduct;
            product.pDiscount=pDiscount;
            product.discountedPrice=discountedPrice;
            product.selectedCategoryT=selectedCategoryT;
            product.selectedCategoryS=selectedCategoryS;
            product.selectedCategory=selectedCategory;
            product.save().then((fdata)=>{
                console.log(fdata)
                res.status(200).json({product})
            })
            .catch(err => {
                console.log(err.message);
                res.status(400).send(err.message)
            })
        })

    },

    delProduct(req,res){
        const {id} = req.body

        Product.findByIdAndDelete(id)
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err.message)
            res.send(400).send(err.message)
        })
    }



}