import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import store from '../store'
import {
  GET_ERRORS,
  GET_PRODUCTS,
  CART_PRODUCTS,
  ADD_CART,
  PROCEED_PRODUCT,
  UPDATE_PRODUCT,
  CONFIRM_ORDER,
  DEL_APPROVALS,
  TOTAL_PRICE,
  WISHLIST,
  EMPTY_CART,
  DEL_WISHLIST,
  PATH_CHECKER
} from "./types";
var preProducts=undefined
// const state = store.getState();
// import {socket} from '../components/centralized/navbar'

var arr=JSON.parse(localStorage.getItem('CartProduct')) || [];
var getCartProdLocalStorage=[]

 export const getProducts = (caller) => dispatch => {
  console.log(`GEtPRoducts called by ${caller}=====`)
  // socket.emit("call_products")
  // socket.on("get_products",(products)=>{
  //   console.log('socket products====',products)
  //   return(
  //     dispatch({
  //          type: GET_PRODUCTS,
  //          payload: products
  //        })
      
  //        )   
  // })
    axios
      .get("/api/products")
      .then((res) => {
        preProducts=res.data
                      console.log("GetProducts success---", res)
                      return(
                         dispatch({
                              type: GET_PRODUCTS,
                              payload: res.data
                            })
                         
                            )    
                        }) // re-direct to login on successful register
      .catch(err => { 
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
        console.log("GetProducts Error---", err.message)}
      );
  };

 export const addToCart = (product) => dispatch => {
   
      const productCart={
        productId:product.item,
        store:'K-TOWN',     //{name:'Store9',id:'090078601'},
        quantity:product.quantity,
        userId:product.userId,
        
      }
            console.log('No.8:--OurArray-----',arr)
            console.log('LocalStorageCheck----',JSON.parse(localStorage.getItem('CartProduct')))
        // Checking data (available || not) in Storage 
            if( JSON.parse(localStorage.getItem('CartProduct'))!=null && JSON.parse(localStorage.getItem('CartProduct')).length!=0){
              
                  console.log('No2:--If K Andar ka GetCart-----',getCartProdLocalStorage)

                  getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
                  //Function to match items
                  function checkItem(item){
                      return item.filterProduct._id==productCart.productId
                  }

                  // Array.find() to find each data matching the params
                  var result=getCartProdLocalStorage.find(checkItem);

                  console.log('No5:--fnl array--------:',JSON.stringify(result));
                 

                  //Result will be undefiend when current data isn't available in prev data array
                    if(result===undefined){ 
                        // console.log(filterObj[0]._id, 'No6:--find hua wa id');
                        axios
                        .post("/api/user-data/addToCart", productCart)
                        .then((res) => {

                             
                               localStorage.setItem('addCart',JSON.stringify(res.data))
                                console.log('ProductId quantity', res.data)
                              var currId = JSON.parse(localStorage.getItem('addCart')).data
                              console.log(currId, 'abhi ki id') 
                  
                              // var prod = JSON.parse(localStorage.getItem('Products'));
                              //   console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
                              // var filterObj = prod.filter((e) => {
                              //   return e._id === productCart.productId
                              // });
                              console.log('No.8:--IfOurArray-----',arr)


                        var newProd = {
                          filterProduct: product.item,
                          cartSchemaId:   currId._id,
                          quantity:      currId.quantity,
                        }
                        arr.push(newProd)
                          localStorage.setItem('CartProduct', JSON.stringify(arr))
                        dispatch({
                          type: CART_PRODUCTS,
                          payload: res.data.data
                        })
                      }) 
                      .catch(err =>
                        {
                        console.log('Cart reducer err---- ', err.message);
                                return(
                        dispatch({
                          type: GET_ERRORS,
                          payload: err.message
                        })
                        )}
                      );
                
                      }
    //                   else{
    //                     var newArr=[{filterProduct:result.filterProduct,cartSchemaId:result.cartSchemaId,quantity:result.quantity+1}]
    //                     const update = {
    //                       qnty: newArr
    //                     }
    //                     console.log('Api Call se pehle newArr----',result,newArr,arr)
    //                     axios.put("http://localhost:5000/api/user-data/updateCart", update )
    //                     .then(res => {
    //                         console.log('Update cart res----',res.data)
    //                         var matchItem = arr.findIndex(i => i._id == result.cartSchemaId );
    //                          arr.splice(matchItem,1,newArr[0])
    //                          console.log('Api Call k bd newArr----',newArr,arr)
    //  //need to be update .... // localStorage.setItem('CartProduct',JSON.stringify(arr))
    //                         // console.log(this.state.cartProducts)
    //                         // this.setState({tick:'inline',loader:'none'})
                       
    //                     })
                
    //                     .catch(err => {
    //                         console.log('cart update ka error.. >',err.message)
    //                     })
    //                   }

            }
            else
            {
              productCart.checker=true
               console.log('products cart else======',productCart)
              axios
                  .post("/api/user-data/addToCart", productCart)
                  .then((res) => {
                       
                         localStorage.setItem('addCart',JSON.stringify(res.data))
                          console.log('ProductId API', productCart.productId)
                        var currId = JSON.parse(localStorage.getItem('addCart')).data
                        console.log(currId, 'abhi ki id') 
            
                       
                        console.log('No.8:--Else1-OurArray-----',arr)

                    var newProd = {
                      filterProduct: product.item,
                      // matchId: currId._id,
                      cartSchemaId:  currId._id,
                      quantity: productCart.quantity
                    }
                    // arr=[]
                     arr.length=0;
                    console.log('No.8:--Else2-OurArray-----',arr)
                    arr.push(newProd)
                    localStorage.setItem('CartProduct', JSON.stringify(arr))

                    dispatch({
                      type: CART_PRODUCTS,
                      payload: res.data.data
                    })

                  }) 
                  .catch(err =>
                    {
                    console.log('Cart reducer err---- ', err);
                            return(
                    dispatch({
                      type: GET_ERRORS,
                      payload: err.message
                    }))}
                  );
              };
          
            }


    export const updateCart = (update) => dispatch => {
      console.log('updata cart====>>>')
      axios
      .put('/api/user-data/updateCart',update)
      .then(res => {
        dispatch(userCart(update.schemaId))
        console.log('Update Cart action success ', res.data)
      })
      .catch(err => {
        console.log('Update cart Action error......., ', err.message)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
    }        
    


  export const userCart = (userId) =>  dispatch => {
    var storeArr=[];
    var prodArr=[]
    axios
      .get(`/api/user-data/cart/${userId}`)
      .then(async (res) => {
          console.log('UserCart Products=====>',res.data.products)
          // var products= res.data.products.products;
          // const state = store.getState();

      // await products.forEach(async(item,index)=>{
      //       storeArr.push({name:item.name,product:[]})
      //   await item.product.forEach(prodId=>{
      //         var filtered = preProducts.filter(e=>{
      //           return e._id===prodId.productId
      //         })
      //         if(filtered){
      //           storeArr.product.push({filterProduct:filtered,quantity:prodId.quantity})
      //         }
      //         console.log('Filtered item matched cart======>>>Store=',item,'product=',filtered)
      //       })
      //     })
      //     console.log('PreProducts Action se=========>',preProducts)
      //     console.log('Reducer state from action======>',storeArr)

                      localStorage.setItem('UserCart',JSON.stringify(res.data))
                      console.log('Cart in local-----:',localStorage.getItem('UserCart') )
                      
                          dispatch({
                              type: CART_PRODUCTS,
                              payload: res.data.products
                            })
                       
                            // history.push('/cart');
                            console.log("Products sent in cart success", res.data);
                        }) // re-direct to cart on success
      .catch(err =>
        {
        console.log('View Cart reducer err---- ', err.message);
        //         return(
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // }))
    }
      );
  };

  export const deleteCartItem = (data) => dispatch => {
    console.log('Delete cart====>>>')
    axios
    .post('/api/user-data/deleteCartItem',data)
    .then(res => {
      dispatch(userCart(data.schemaId))
      console.log('Delete Cart action success ', res.data)
    })
    .catch(err => {
      console.log('Delete cart Action error......., ', err.message)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
  }

  export const proceed = (newProceed) => dispatch => {
    axios
      .post('/api/products/proceed',newProceed)
      .then(res => {
        dispatch({
          type: PROCEED_PRODUCT,
          payload: res.data
        })
        console.log('proceed ka data ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }

  
  export const addProduct = (newPoduct) => dispatch => {
    axios
      .post('/api/createProducts',newPoduct)
      .then(res => {
        dispatch(getProducts('Add Products'));
        console.log('create product admin sy ka data ', res.data)
      })
      .catch(err => {
        console.log('create product error......., ', err.message)
      })
  }

  export const updateProduct = (updatePoduct) => dispatch => {
    axios
      .put('/api/updateProducts',updatePoduct)
      .then(res => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: res.data
        })
        console.log('Update product admin sy ka data ', res.data)
      })
      .catch(err => {
        console.log('Update product error......., ', err.message)
      })
  }

  export const sendToCartOwner = (orderData) => dispatch => {
    axios
      .post('/api/cartOwner/confirmOrder',orderData)
      .then(res => {
        dispatch({
          type: PROCEED_PRODUCT,
          payload: res.data
        })
        console.log('proceed ka data ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const delAfterApproved = (key) => dispatch => {
    axios
      .post('/api/del/approved',key)
      .then(res => {
        dispatch({
          type: DEL_APPROVALS,
          payload: res.data
        })
        console.log('approval wali product del ho gai admin sy ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const delCartProducts = (prcd) => dispatch => {
    axios
      .post('/api/del/cart',prcd)
      .then(res => {
           localStorage.removeItem('CartProduct');
        console.log('approval wali product del ho gai admin sy ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const totalPrice = (data) => dispatch => {
    dispatch({
      type: TOTAL_PRICE,
      payload: data
    })
  }

  export const wishList = (data) => dispatch => {
        axios
        .post('http://localhost:5000/api/wishList',data)
        .then(res => {
            dispatch({
              type: WISHLIST,
              payload: data
            })
          console.log('Wish List Ka Action then sy', res.data)
        })
        .catch(err => {
          console.log('Wish List ka error......., ', err.message)
        })
  }

  export const getWishList = (data) => dispatch => {
    // console.log(data)
    axios
    .post('http://localhost:5000/api/getWishList',data)
    .then(res => {
      console.log(res.data)
        dispatch({
          type: WISHLIST,
          payload: res
        })
      // console.log('Wish List Get ki Req sy', res.data)
    })
    .catch(err => {
      console.log('Wish List ka error......., ', err.message)
    })
}

export const delWishList = (data) => dispatch => {
  // console.log(data)
  axios
  .post('http://localhost:5000/api/del/wishList',data)
  .then(res => {
    console.log(res.data)
      dispatch({
        type: DEL_WISHLIST,
        payload: res.data
      })
    // console.log('Wish List Get ki Req sy', res.data)
  })
  .catch(err => {
    console.log('Wish List ka error......., ', err.message)
  })
}
export const infoPathCheck = (data) => dispatch => {
  // console.log(data)
      dispatch({
        type: PATH_CHECKER,
        payload: data
      })
    // console.log('Wish List Get ki Req sy', res.data)
 
}
 