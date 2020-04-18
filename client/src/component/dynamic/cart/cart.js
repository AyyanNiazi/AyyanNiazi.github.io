import React from 'react';
import './style/cart.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import prod1 from '../images/prod1.png'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import {addToCart,totalPrice,infoPathCheck,userCart, updateCart, deleteCartItem} from '../../../store/actions/productsAction'

var lineTotalArr = []

class Cart extends React.Component{ 

constructor(){
  super();
  this.state={
    cartProducts:undefined,
    quantity:undefined,
    cartArray:undefined,
    checked:false,
    cartAllProducts:undefined,
  }
}

  componentDidMount(){
    console.log('local styorge',this.props.cartProducts) 
    if(this.props.cartProducts){
      const {cartProducts}= this.props
      let cartAllProducts = []
      cartProducts.products.forEach((item,index)=>{
          item.product.forEach((data,i)=>{
            item.checkStore=false
            data.checkProduct=false
            cartAllProducts.push(data)
          })
      })
      console.log('Cart All Rpopdasgjh====>>>>',cartAllProducts)

      this.setState({
          cartProducts:this.props.cartProducts,
          cartAllProducts:cartAllProducts
      })        
    }
    else{
      console.log('user id cart se:=====>',this.props.auth.user.id)
      this.props.userCart(this.props.auth.user.id)
    }
    // this.props.totalPrice(this.state.totalPrice)
}

componentWillReceiveProps(nextProps){

  console.log("Will recieve props h boss......",nextProps)
 if(nextProps.cartProducts){
   const {cartProducts}= nextProps
   let cartAllProducts = []
   cartProducts.products.forEach((item,index)=>{
       item.product.forEach((data,i)=>{
          item.checkStore=false
          data.checkProduct=false
         cartAllProducts.push(data)
       })
   })
   console.log('Cart All Rpopdasgjh====>>>>',cartAllProducts)
    //  console.log("nxt prop......",nextProps)
     this.setState({
         loader:false,
         cartProducts:nextProps.cartProducts,
         cartAllProducts:cartAllProducts
     })
 }
 else if(nextProps.cartProducts==null){
    this.setState({
      cartProducts:null
    })
 }
 else{
     console.log("nhi aya beta.......")
 }
}

async onIncreaseQty(prod,upperIndex,index,price,e){
  e.preventDefault();
  const arr = this.state.cartProducts.products[upperIndex].product
  console.log('Array Incerees=====>>>',arr)
  const {_id} = prod
  var qnty  = arr.map((item,i) => {
     
     if(item.productId._id === _id && item.quantity<item.productId.stock){
         item.quantity +=1 
         return item
     }
 })
 console.log('Quantity console====>',qnty[index],this.state.cartArray)
 let update={
   storeIndex:upperIndex,
   productIndex:index,
   schemaId:this.state.cartProducts._id,
  qnty:qnty[index]
}
   this.props.updateCart(update)
   this.setState({cartArray:qnty[index],tick:'none',})
  

}
async onDecreaseQty(prod,upperIndex,index,price,e){
  e.preventDefault();
  const arr = this.state.cartProducts.products[upperIndex].product
  const {_id} = prod
  var qnty  = arr.map((item,i) => {
     
     if(item.productId._id === _id && item.quantity!==1){
         item.quantity -=1 
         return item
     }
 })
 console.log('Quantity console====>',qnty[index],this.state.cartArray)
 let update={
  storeIndex:upperIndex,
   productIndex:index,
   schemaId:this.state.cartProducts._id,
  qnty:qnty[index]
}
   this.props.updateCart(update)
 this.setState({cartArray:qnty[index],tick:'none',})
  
}

deleteCartProduct(prod,upperIndex,index,e){
  e.preventDefault();
  let data={
    storeIndex:upperIndex,
     productIndex:index,
     schemaId:this.state.cartProducts._id,
  }
  this.props.deleteCartItem(data)
}

// onChangeQty(id,index,price,e){
//   e.preventDefault();
//   console.log('price', this.state.totalPrice)
//    const arr = this.state.cartProducts
 
//    var qnty  = arr.map((item,i) => {
      
//       if(item.cartSchemaId === id){
//           item.quantity = parseInt(e.target.value)
//           return arr
//       }
//   })
//   // console.log('qty',qnty[index][index].quantity)
//   var lineTotal = (qnty[index][index].quantity*price)
//   var finalIndex = totalPrice[totalPrice.length-1]
//   var secondLast = totalPrice[totalPrice.length-2]
//   // console.log('akhri ky sum',finalIndex+secondLast)
//   lineTotalArr.push(qnty[index][index].quantity*price)
//   // console.log('line total arr', lineTotalArr)
//   var newPrice = lineTotalArr.reduce((a, b) => {return a+b })
//   // console.log('array total price ki', newPrice )
//   this.setState({cartArray:qnty[index],tick:'none',})

//   // this.setState({
//   //     totalPrices: this.state.totalPrice
//   // })
//   this.props.totalPrice(this.state.totalPrice)

//       // localStorage.setItem('CartProduct',JSON.stringify(qnty))        
// }

checkStoreProducts=(storeName,chk,e)=>{
  e.preventDefault();
  console.log('Event Checked',chk,e.target.checked)
//   const {cartProducts} = this.state
//   cartProducts.products.forEach((item,index)=>{
//     if(item.name===storeName){
//       // item.checkStore=e.target.checked
//       item.product.forEach((data,i)=>{
//       //  if(data.productId._id===''){
        
//         data.checkProduct=!data.checkProduct

//         this.setState({
//           cartProducts:cartProducts,
//           checked:!this.state.checked
//         })
//       //  }
//       })
//     }
// })
}

checkSingleProduct(e){
  e.preventDefault();
  const {cartProducts} = this.state
  cartProducts.products.forEach((item,index)=>{
    if(item.name===''){
      item.product.forEach((data,i)=>{
       if(data.productId._id===''){
        //  item.checkStore=true
        data.checkProduct=!data.checkProduct

        this.setState({
          cartProducts:cartProducts,
        })
       }
      })
    }
})

}
 
  

  render() {
     console.log('Stat se CartProducts=====',this.state.cartProducts)
     const {cartAllProducts,cartProducts} = this.state
    var arr=[0]

  return (
    <div className="cartTop">
      <div className='cartContainer' >
        <div className='cartItem1' >
            <div className='cartHeading' >
               {this.state.cartAllProducts?<h1 style={{marginBottom: '20px'}} >Shopping Cart ({cartAllProducts.length})</h1>
               :<h1 style={{marginBottom: '20px'}} >Shopping Cart (0)</h1>} 
                <input style={{border: '1px solid red',}} className='checkboxes' type='checkbox' width='20' height='20' 
                onClick={(e)=>{
                  console.log('Chlgya=>>>',e.target.checked)
                          const {cartProducts} = this.state
                          cartProducts.products.forEach((item1,index)=>{
                            // if(item1.name===item.name){
                               if( e.target.checked!==item1.checkProduct){
                              item1.checkStore=!item1.checkStore
                              item1.product.forEach((data,i)=>{
                                // if( e.target.checked!==data.checkProduct)
                                data.checkProduct=!data.checkProduct
                                this.setState({
                                  cartProducts:cartProducts,
                                })
                              })
                            }
                        })
                }}
                /> <span className='storeName'>Select all </span>
            </div>

            {this.state.cartProducts?
                  this.state.cartProducts.products.map((item,index)=>{
                    return(
            <div className='cartProducts' style={{marginBottom:'10px'}} >
                <div> 
                    <input type='checkbox' className='checkboxes'  checked={item.checkStore}
                      onClick={(e)=>{
                        console.log('Chlgya=>>>',e.target.checked)
                          const {cartProducts} = this.state
                          cartProducts.products.forEach((item1,index)=>{
                            if(item1.name===item.name){
                              item1.checkStore=!item.checkStore
                              item.product.forEach((data,i)=>{
                                if( e.target.checked!==data.checkProduct){
                                data.checkProduct=!data.checkProduct
                                this.setState({
                                  cartProducts:cartProducts,
                                })
                              }
                              })
                            }
                        })
                      }} />
                    <span className='storeName' >{item.name}  <span  style={{marginLeft:'30px', color: '#999999'}} >
                    <i style={{marginRight:'5px', color: '#999999',fontSize: '20px'}} className='fa fa-envelope' ></i> Contact </span> </span>
                    <hr style={{border: '1px solid #999999'}} />
                </div>
                {item.product.map((prods,prodIndex)=>{
                  return(

                  <div className='' style={{marginBottom:'10px'}} >
                 <Row>
                    <Col md='1' style={{paddingRight: '0px',position: 'relative', top: '20px'}} ><input type='checkbox' checked={prods.checkProduct} className='checkboxes'
                     onClick={(e)=>{
                      cartProducts.products.forEach((item1,index)=>{
                        if(item1.name===item.name){
                          item.product.forEach((data,i)=>{
                           if(data.productId._id===prods.productId._id){
                            //  item.checkStore=true
                            data.checkProduct=!data.checkProduct
                    
                            this.setState({
                              cartProducts:cartProducts,
                            })
                           }
                          })
                        }
                    })
                     }} 
                     />  </Col>
                    <Col md='2' style={{padding: '0px'}} > <img style={{borderRadius: '8px'}} src={prods.productId.image[0]} width='120px' height='140px' /> </Col>
                    <Col md='6' style={{padding: '0px'}}> 
                  <p>{prods.productId.name}</p> 
                      <p><b>Color:  </b>{prods.productId.colors.map(color=>{return(<span style={{marginRight:'5px'}}>{color},</span>)})}</p> 
                      <p><b>PKR {prods.productId.discountedPrice?
                                    prods.productId.discountedPrice
                                    : prods.productId.price
                                    }</b> </p> 
                      {/* <p>this is free delivery from some where where is not allowed</p>  */}
                    </Col>
                    <Col md='2' style={{position: 'relative', top: '0px',textAlign: 'right'}} > 
                      <i style={{fontSize: '22px',margin: '10px'}} class="fa fa-heart-o cursor-pointer" aria-hidden="true"></i>
                      <i style={{fontSize: '22px',margin: '10px'}} onClick={this.deleteCartProduct.bind(this,prods.productId,index,prodIndex)} class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
                        <br/><br/>
                        {/* <p className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name={item._id} defaultValue={item.quantity}
                                        onChange={this.onChangeQty.bind(this,item.cartSchemaId,index,arr.reduce((a, b) => {return a + b}))} value={this.state.quantity} id={index} min='1' max={item.filterProduct.stock} /></p> */}
                        <p> <span onClick={this.onDecreaseQty.bind(this,prods.productId,index,prodIndex,arr.reduce((a, b) => {return a + b}))} className='prodQuantity cursor-pointer' >-</span >
                             <span  className='quanDigit'>{prods.quantity}</span> 
                                <span onClick={this.onIncreaseQty.bind(this,prods.productId,index,prodIndex,arr.reduce((a, b) => {return a + b}))} className='prodQuantity cursor-pointer'>+</span> 
                           </p>
                      
                   </Col>
                  </Row>
                </div>
                  )

                })}
            </div>
                  )}):this.state.cartProducts===null?<h2 style={{textAlign:'center'}}>No Product Added Yet, <Link to='/'>Shop Now...</Link></h2>:<h1>Loading...</h1>}
        </div>

        <div className='cartItem2' >
          <div className='cartRight' >
              <h2 style={{fontWeight:'800'}}  > Order Summary</h2>
                <hr style={{border: '1px solid #999999'}} />
               <br/>

              <ul className='orderSummary row' >
                <li style={{}} className='col' > Subtotal </li>
                <li style={{textAlign: 'right', marginRight: '20px'}} className='col'> PKR 765.00 </li>
                
              </ul>
              <ul className='orderSummary row' >
                <li className='col' > Shipping </li>
                <li style={{textAlign: 'right', marginRight: '20px'}} className='col'> PKR 765.00 </li>
              </ul><br/><br/>

               <ul className='orderSummary row' >
                <li style={{fontWeight: '900', fontSize: '14px', marginTop: '5px',paddingRight: '0px'}} className='col'> Total </li>
                <li style={{textAlign: '', marginRight: '8px',fontSize: '20px',fontWeight: '900'}} className='col'> PKR 2400.00 </li>                
              </ul>
                <br/>
              <button className='btn btn-lg btn-block' style={{background: '#FF4747',color: 'white'}} > Buy (0) </button>

          </div>
        </div>

      </div>
    </div>
  );
}
}

const mapStateToProps = (state) =>{
  // var array= Array.from(state.products.cartProducts)
  console.log("Reducer check cart prod.............", state.cartReducer.cart)
  return{ 
      cartProducts: state.cartReducer.cart,
      products: state.products,
      totalPriceReducer: state.cartReducer.totalPrice,
      auth:state.auth
  }
} 

export default connect(
  mapStateToProps,
  { userCart, addToCart,totalPrice,infoPathCheck, updateCart, deleteCartItem }
)(Cart);