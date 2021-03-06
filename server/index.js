require('dotenv').config();
const express = require('express');
// const http = require("http");
// const socketIO = require("socket.io");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const Test = require('./models/socketTest');
const Product = require('./models/product')
const Image = require('./models/socketTest')
const userController = require('./controllers/user_controller');
const adminController = require('./controllers/admin/admin_controller');
const productsController = require('./controllers/products_controller');
const vendorController = require('./controllers/vendor/vendor_controller');
const PORT = process.env.PORT || 4000;
const passport = require("passport");

// const server = http.createServer(app);
// const io = socketIO(server);

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
cloud_name: "dmnwohauy", //ENTER YOUR CLOUDINARY NAME
api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
    if(err){
        console.log('Database Connection Err-------------:',err);
        
    }
    else
    console.log('Database Connected-------------');
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000*60*60*24*17
    }
}));

app.use(cors());
app.use(passport.initialize()); 
require("./config/passport");

//socket io working...

setTimeout(()=>{
    app.get("/viewImages", (req, res) => {
        Image.find(function(err, images) {
          if (err) {
            res.json(err.message);
          } else {
            res.json(images);
          }
        });
      });
      
      app.post("/add", upload.single("image"), (req, res) => {
          console.log('/add called====',req.body)
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
          if (err) {
            req.json(err.message);
          }
          req.body.image = result.secure_url;
          // add image's public_id to image object
          req.body.imageId = result.public_id;
      
          Image.create(req.body, function(err, image) {
            if (err) {
              res.json(err.message);
              return res.redirect("/viewImages");
            }
            console.log('res send',image)
            res.json(image)
          });
        });
      });

  /*-------SOCKET IO for real time--------*/    
    // io.on("connection", socket => {
    //     console.log("New client connected" + socket.id);
    //     // Returning the initial data of food menu from FoodItems collection
    //     socket.on("call_products", () => {
    //         console.log('initial data called by client=====')
               
    //             // Product.find({}).then(docs => {
    //             //     console.log('emitted data====',docs)
    //             //     io.sockets.emit("get_products", docs);
    //             // });
    //             // res.status(200).json({success:true, data})
           
    
    //      });
    // })

    /* -----------GET Google Authentication API.----------- */
        app.get(
          "/auth/google",
          passport.authenticate("google", { scope: ["profile", "email"] })
        );
        app.get(
          "/auth/google/callback",
          passport.authenticate("google", { failureRedirect: "/", session: false }),userController.authGoogleCallback);
          // function(req, res) {
          //     var token = req.user.token;
          //     console.log('res.user>>>=====',req.user)
          //     res.redirect("http://localhost:3000?token=" + token);
          // }
        // );

  /*---------Data Call APIs---------*/ 
    app.get('/api/user-data', userController.readUserData);
    //Add a item to cart.
    app.post('/api/user-data/addToCart', userController.addToCart);
    //update cart item
    app.put('/api/user-data/updateCart', userController.updateCart);
    //view cart items
    app.get('/api/user-data/cart/:id', userController.viewCart);
    //Remove a item from the cart.
    app.post("/api/user-data/deleteCartItem", userController.deleteCartItem);
    // Use request parameter to remove item from cart since you are looking a specific item in cart.
    app.post("/api/user-data/delCart", userController.removeFromCart);
    //User Register to place order
    app.post('/api/register', userController.register)
    //When user login
    app.post('/api/login', userController.login);
    //When the user logouts
    app.post('/api/logout', userController.logout);
    //Products Endpoints
    //Getting all the products
    app.get('/api/products', productsController.readAllProducts);
    //Getting a specified product
    //Use a request parameter, since retrieving a specified product..
    app.get('/api/products/:id', productsController.readProduct);
    //Admin Endpoints
    //Gets the admin users.
    app.get('/api/users', adminController.getAdminUsers);
    //When a admin creates a product. No need for request parameter in this case. Since we are inserting data to database.
    
    // app.post('/api/createProduct', upload.array("image") , adminController.createproduct);

    app.post('/api/admin/addProduct', upload.array("image") , vendorController.addProduct);

    // app.get('/api/vendor/getVendorStore', upload.array("image") , vendorController.getVendorStore);

    app.post('/api/admin/productApprovals', upload.array("image") , adminController.productApprovals);
    
    app.get('/api/bookedProducts', adminController.bookedProduct);

    // app.get('/api/delProducts', adminController.delProducts);
    //When a admin update a current product. Need request parameter since updating a specific product based on  the id.
    // app.put('/api/updateProducts', adminController.updateProduct);
    //When a admin deletes a product, need an id to specify a product to delete.
    app.post('/api/delProducts', adminController.deleteProduct);

    app.get('/api/products/pending', adminController.pendingProduct);

    app.post('/api/products/proceed', userController.proceed);
    
    app.get('/api/get-stock', adminController.getStock);

    app.get('/api/admin/getStore', adminController.getStore);

    app.get('/api/vendor/getStore/:id', vendorController.getStore)

    app.get('/api/vendor/getProducts/:id', vendorController.getProducts);

    app.post('/api/admin/updateStatus', adminController.updateStatus);

    app.post('/api/cartOwner/confirmOrder', adminController.cartOwner);

    app.post('/api/vendor/signup', vendorController.signup);

    app.post('/api/vendor/updateProduct', vendorController.updateProduct);

    app.post('/api/vendor/login', vendorController.vendorLogin);

    app.post('/api/vendor/createStore', vendorController.createStore)

    app.post('/api/vendor/delProduct', vendorController.delProduct);

    
    
    


},200);

app.listen(PORT,()=>{console.log('Server running on Localhost:',PORT)});
