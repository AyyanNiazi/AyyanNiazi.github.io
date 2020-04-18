const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserCart = require('../models/userCart');
const Product = require('../models/product');
const User = require('../models/user');
const Proceed = require('../models/proceed');
const validateRegisterInput = require('../validation/register');
const validateInformationInput = require('../validation/information');
const validateLoginInput = require('../validation/login');
// var ip = require("ip");
var currentProduct=undefined
let arr=[]
module.exports = {

    readUserData(req, res){

    },
    //Need to be fixed........
    async addToCart(req, res){
        const { productId, quantity, userId, store } = req.body;
        // const { id } = req.params;
        console.log('addtocart-----------:', req.body.productId,store )
        UserCart.findById(userId).exec((err,result)=>{
            var storeArray=[{
                name:store,
                product:[{productId:productId,quantity:quantity}],
                    
            }]
            var dummyArray=[]
            
            if(!result){
                arr=storeArray[0]
                let productInCart = new UserCart({
                    _id:userId,
                    products:storeArray

                })
                productInCart.save().then(data=>{
                 console.log('New UserCart=====>',data)   
                // Product.findByIdAndUpdate(productId,{ $inc: { stock: -1 } }).then((product)=>{
                //     currentProduct=product
                //     console.log('ProductUpdate success: ',product)
                // })     
                res.status(200).json({success:true, data})
                })
                .catch(err => {
                    console.log('AddToCart Save Err--------',err.message)
                    res.json(err);
        
                });
            }
            else if(result){
                let index;
                            // if(err){
                                console.log('Update-mgs====>',store)
                            //     return res.status(400).json(err)
                            // }
                            let filtered=result.products.filter(e=>{
                                return e.name===store
                            })
                            index=result.products.findIndex(e=>{
                                return e.name===store
                            })
                            if(filtered.length>=1){
                                if(arr.length===0){
                                    arr=[]
                                    arr=result.products
                                    console.log('index of filtered=====>>>',index,arr)
                                    arr[index].product.push({productId:productId,quantity:quantity})
                                }
                                else{
                                    arr=result.products
                                    console.log('index of filtered01=====>>>',index)
                                    arr[index].product.push({productId:productId,quantity:quantity})
                                }
                                console.log('Length 1 hai=====',arr)
                                   UserCart.findByIdAndUpdate(userId,{products:arr}).exec((err,data)=>{
                                    if(err){
                                        console.log('Error aya hai database se',err)
                                        res.status(400).json(err)
                                    }
                                    else{
                                        data.products=arr
                                        console.log('Resposne data====>>>',data)
                                    res.status(200).json({success:true,data})
                                    }
                                })

                            }
                            else{
                                arr=[]
                                arr = result.products
                                arr.push(storeArray[0])
                                console.log('Length 1 se zyada hai=====',arr)
                                UserCart.findByIdAndUpdate(userId,{products:arr}).exec((err,data)=>{
                                    if(err){
                                        console.log('Error aya hai database se',err.message)
                                    }
                                    else{
                                    data.products=arr
                                    console.log('Resposne data====>>>',data)
                                    res.status(200).json({success:true, data})
                                    
                                    }
                                })
                                
                            }
                            // result.products.push(storeArray[0])
                            console.log('filtered=====',filtered)

                            // console.log('Update-Success-mgs====>',data)

                            
                        
                      
            }

        }) 

    },
    viewCart(req, res){
        const {id} = req.params
        UserCart.findById(id).exec((err, products)=>{
            if(err){
                console.log('View cart err------:', err.message)
                return res.status(400).json(err)
            }
            else{
                // const  =products.productId
                res.status(200).json({success:true, products})
            }
        })
        

    },

    updateCart(req, res){
        var {qnty,schemaId, productIndex, storeIndex}=req.body
        console.log('Update',req.body)
        var finalArr=[]
        // qnty.forEach((element,index )=> {
            
            const { productId, quantity } = qnty
           
            UserCart.findById(schemaId).exec((err, productCart)=>{
                if(err){
                    console.log('Err usercart',err.message)
                }
               else if(productCart){ 
                   console.log("Product Cart Quantityy------",productCart.products[storeIndex])
                   if(productCart.products[storeIndex].product[productIndex].quantity!=qnty.quantity){
                    // var newStock = productCart.quantity-qnty.quantity
                    // console.log('New Stock=====',newStock)
                    // return (
                    //      Product.findById(filterProduct._id).then((product)=>{
                    //     currentProduct=product
                    //     console.log('UpdateCart Change Stock success:===== ',product)
                    //     product.stock=product.stock+newStock
                    //     product.save().then((success)=>{
                    //     console.log('PeoductNew Stock======',product.stock)
                        productCart.products[storeIndex].product[productIndex].quantity = qnty.quantity
                        productCart.markModified('products');
                        productCart.save().then((data)=>{
                        // finalArr.push(productCart);
                        console.log('If FinalArray====',productCart.products[storeIndex].product[productIndex].quantity,'<------->',data.products[storeIndex].product[productIndex].quantity)
                        // if(finalArr.length==qnty.length){
                            res.status(200).json(data)
                        // }
                    })
                    // });
                    // })   
                    
                    }
                    else{
                        console.log('Else New Stock=====',productCart.products[storeIndex].product[productIndex].quantity,quantity)
                        productCart.quantity = quantity
                        productCart.save().then((data)=>{
    
                        // finalArr.push(productCart)
                        // if(finalArr.length==qnty.length){
                        console.log('If FinalArray====',productCart,'<------->',data)
                        //     console.log('Else FinalArray====',finalArr,index,qnty.length-1)
                            res.status(200).json(data)
                        // }
                    })
                    }
                  }
            })
        // });
        

    },

    deleteCartItem(req, res){
        var {schemaId, productIndex, storeIndex}=req.body;
        UserCart.findById(schemaId).exec((err, productCart)=>{
            if(err){
                console.log('Err usercart',err.message)
            }
           else if(productCart){ 
               console.log("Product Cart Quantityy------",productCart.products[storeIndex])
               if(productCart.products[storeIndex].product[productIndex]){
                    if(productCart.products[storeIndex].product.length>1){
                        productCart.products[storeIndex].product.splice(productIndex,1) 
                    }
                    else{
                        productCart.products.splice(storeIndex,1)
                    }
                    
                    productCart.markModified('products');
                    productCart.save().then((data)=>{
                    // finalArr.push(productCart);
                    // console.log('If FinalArray====',productCart.products[storeIndex].product)
                  
                    if(productCart.products.length==0){
                        productCart.remove();
                        console.log('Schema deleted===>>>>')
                    }
                        res.status(200).json(data)
                  
                })
            }
          }
        })
    },

    //Need to be fixed........
    removeFromCart(req, res){
        // const { id } = req.params;
        const { key,productId,quantity } = req.body;
        console.log('remove cart=====',req.body);

        UserCart.findOneAndDelete(key)
        .then(cart => {cart.remove()
                      .then(() =>{
                        Product.findById(productId).then((res)=>{
                            res.stock=res.stock+quantity
                            res.save().then(success=>console.log('deletecart added stock===',success))
                        })
                        res.json({ success: true,cart })
                        })
                    })
        .catch(err => {res.status(404).json({ success: false })
    console.log(err.message)
    });
    
        // UserCart.findByIdAndDelete(key).exec((err, data)=>{
        //     if(err) console.log("removeFromCart err-----------:",err.message)
        //     else
        //     res.status(200).json({success:true,data})
        // });

        // UserCart.update(
        //     {$pull: {product: id}},
        //     {safe: true, upsert: true},
        //     function(err, doc) {
        //         if(err){
        //         console.log(err);
        //         }else{
        //         //do stuff
        //         }
        //     });

        // find by document id and update and pop or remove item in array
        // users.findByIdAndUpdate(userId,
        //     {$pull: {product: id}},
        //     {safe: true, upsert: true},
        //     function(err, doc) {
        //         if(err){
        //         console.log(err);
        //         }else{
        //         //do stuff
        //         }
        //     });


        //   UserCart.save().then((data)=> {res.status(200).json({
        //       success:true,
        //       data
        //     })}).catch(err=>console.log(err))

    },

    proceed(req, res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,} = req.body
        console.log(req.body)

         // Form validation
         const { errors, isValid } = validateInformationInput(req.body);
         // Check validation
             if (!isValid) {
             return res.status(400).json(errors);
             console.log('isValid bad: ',errors);      
             }

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
    register(req, res){
         // Form validation
         console.log('Register: ',req.body);      
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
            if (!isValid) {
            return res.status(400).json(errors);
            }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            console.log('findOne bad: ');
            
            } else {
              const newUser = new User({
                email: req.body.email,
                password: req.body.password,
              });
        // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));
                });
              });
            }
          }).catch(err=> console.log(err));
        },

    login(req, res){
        console.log('Login: ',req)
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const email = req.body.email;
            const password = req.body.password;
            const userType = req.body.userType;
            // Find user by email
            User.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                return res.status(404).json({ loginEmailnotfound: "Email not found" });
                }
            // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log("userID: ",user.id)
        
                    // User matched
                    // Create JWT Payload
                    const payload = {
                    id: user.id,
                    name: user.name,
                    userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 86400 // 1 year in seconds
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
    logout(req, res){

    },

    authGoogleCallback(req,res){
        // var token = req.user.token;
        console.log('res.user>>>=====',req.user)
        User.findOne({email:req.user.email}).exec((err,user)=>{
            if(user){
                console.log('Gmail Already Exist',user)
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 86400 // 1 year in seconds
                    },
                    (err, token) => {
                        res.redirect("http://localhost:3000?token=" + token);
                        // res.json({
                        // success: true,
                        // token: "Bearer " + token
                        // });
                    }
                    );
            }
            else if(!user){
                const newUser = new User({
                    name: req.user.name,
                    email: req.user.email,
                    password: `#Pael526${req.user.email}q1w2e3zaxscd`,
                  });
            // Hash password before saving in database
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then((user) =>{ 
                            const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
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
                                res.redirect("http://localhost:3000?token=" + token);

                                // res.json({
                                // success: true,
                                // token: "Bearer " + token
                                // });
                            }
                            )}
                            )
                        .catch(err => console.log(err));
                    });
                  });
            }
        })
        // res.redirect("http://localhost:3000?token=" + token);

    }
}