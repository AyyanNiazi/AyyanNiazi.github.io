import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import SellerRecomendations from './sellerRecomendations'
import './style/product.css'
import prod3 from '../images/prod3.png'
import {getProducts, addToCart} from '../../../store/actions/productsAction';
import {registerUser, loginUser} from '../../../store/actions/authActions'
import classnames from "classnames";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:undefined,
            loading:true, 
            overview: true,
            reviews: false,
            specs: false,
            backgroundImage: undefined,
            backgroundPosition: '0% 0%',
            email:'',
            password:'',
            errors:{},
            user:undefined,
            auth:false,
            loginModal:'',
            loginToggle: false,
         }

    }
componentDidMount(){
     // If logged in and user navigates to Register page, should redirect them to dashboard
     let modal='addCartModal';
     if (this.props.auth.isAuthenticated) {
        // this.props.history.push("/dashboard");
        modal=''
      }
    if(this.props.products){
        console.log('Match Id----',this.props.match.params)
        const {id} = this.props.match.params
        const item = this.props.products.filter(i=>{
            return i._id == id
        })
        console.log('Filtered Item from Single product----',item)
        this.setState({
            item : item[0],
            backgroundImage :`url(${item[0].image[0]})`,
            loading:false,
            auth:this.props.auth,
            loginModal:modal,
            user:this.props.auth.user,
        })
    }
    else{
        this.props.getProducts('Product.js-31')
    }

}
UNSAFE_componentWillReceiveProps(nextProps){
    console.log('match params id',this.props.match.params)
   
    if(nextProps){
        let modal='addCartModal';
        if(nextProps.products){
            const {id} = this.props.match.params
            const item = nextProps.products.filter(i=>{
                return i._id == id
            })
            if(nextProps.auth.isAuthenticated){
                modal=''
            }
            console.log('Filtered Item from Single product----',item);
            this.setState({
                item : item[0],
                backgroundImage :`url(${item[0].image[0]})`,
                loading:false,
                auth:nextProps.auth,
                user:nextProps.auth.user,
                loginModal:modal,
            })
        }
    }
    if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      } 

}


registerToggle(){
    this.setState({
        loginToggle:false
    })
}

loginToggle(){
    this.setState({
        loginToggle:true
    })
}
overview(){
    this.setState({
        overview: true,
        reviews: false,
        specs: false
    })
}

review(){
    this.setState({
        overview: false,
        reviews: true,
        specs: false
    })
}

openModal=(e)=>{
 e.preventDefault();
 console.log('assa')

}

specs(){
    this.setState({
        overview: false,
        reviews: false,
        specs: true
    })
    console.log('chal ry')
}

handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

onChangeRegister = e => {
    e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    };
onCreateAccount = e => {
    e.preventDefault();
    console.log('create account called---')
const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
this.props.registerUser(newUser, this.props.history);
this.setState({
    email: '',
    password: '',
}) 
  }

onChangeLogin = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
 onSignUp = async (e) => {
    e.preventDefault();
      const userData = {
      email: this.state.email,
      password: this.state.password
    };
await this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
this.setState({
    email: '',
    password: '',
})
};

addCart=(item,e)=>{

    e.preventDefault();
    console.log('onsubmit',item)
    
    if(this.state.auth.isAuthenticated){

        let productId = {
            item,
            quantity:1,
           checker: false,
           userId:this.state.user.id
    
        }
    
        // this.props.history.push('/cart')
    
        // this.props.userCart(this.props.history);
    
        this.props.addToCart(productId)
        console.log('new prod====',productId)
        // this.props.history.push('/cart')
    }
}

    




    render() {
        const {item, loading, errors} = this.state
        if(loading===true){return <h1 style={{textAlign:'center'}}>LOADING...</h1>}
        else{ 
        return (    
            <div className='prodMainTop' >
                {/* Store Name */}

                

                {/* product Body Section */}

                <div className=' productBodyfirst'>
                        <div className='gridDisplay' >
                            <div className='item1' >
                            {/* image main display */}
                                <div>
                                    <div className='mainImg' >
                                        <figure className='fig' onMouseMove={this.handleMouseMove.bind(this)} style={this.state}>
                                            <img src={item.image[0]} width='450' height='450' />
                                        </figure>
                                    </div>
                                    {/* products other displays */}
                                    <div className='optionImg'>
                                    {item.image.map(image=>{
                                        return <img src={image} width='50' height='50' />
                                    })}
                                        
                                        
                                    </div>
                                </div>
                            </div>

                           {/* Product Right Side Starting*/}
                            <div className='item2' >
                                 <div className='prodRight' >
                                    <p>{item.name}</p>

                                    <p>5.0 6 Review 51 orders</p>
                                    <br/>
                                    {item.discountedPrice?
                                    <div><h3>PKR {item.discountedPrice}</h3><span><del>PKR {item.price}</del></span></div>
                                    :<h3>PKR {item.price}</h3>
                                    }
                                    <p>If coupons </p>
                                    <br/>
                                    <p>Color:</p>
                                    <div  className='imgForColor' >
                                        {/* <img style={{marginLeft: '0px'}} src={prod3} width='50' height='50' /> */}

                                       
                                        {item.colors.map(i => {return<img key={i} src={item.image[0]} title={i} width='50' height='50' />})}
                                        
                                        {/* <img src={prod3} width='50' height='50' />
                                        <img src={prod3} width='50' height='50' />
                                        <img src={prod3} width='50' height='50' />
                                        <img src={prod3} width='50' height='50' />
                                        <img src={prod3} width='50' height='50' /> */}
                                    </div>

                                    <p>Brand Size:</p>
                                    <div className='brandSize' >
                                        <ul className='brandSizeUl' >
                                            {/* <li style={{marginLeft: '0px'}} >1</li> */}

                                           
                                        {item.sizes.map(i => {return<li key={i}>{i}</li>})}
                                            {/* <li>1</li>
                                            <li>1</li>
                                            <li>1</li>
                                            <li>1</li>
                                            <li>1</li>
                                            <li>1</li>
                                            <li>1</li> */}
                                        </ul>
                                    </div>

                                    <p>Fit: Fits true to size, take your normal size</p>
                                    <p>Quantity:</p>
                                    <p> <span className='prodQuantity' >-</span > <span className='quanDigit'>1</span> <span className='prodQuantity'>+</span> {item.stock} items available </p>
                                        <br/>
                                    <h4 style={{fontWeight: '600'}} >Free Shipping </h4>
                                    <p>Conditions Apply Will be Later </p>
                                    <p>  <span style={{color: '#999999'}} > Estimated Delivery on </span> 03/24 </p>

                                    <div className='prodActions' >
                                        <button style={{backgroundColor: '#FF4747',border: '1px solid #FF4747'}} type='button' className='btn btn-danger' > Buy Now </button>
                                            {/* add cart ka button #addCartModal */}
                                        <button data-toggle="modal" data-target={`#${this.state.loginModal}`} onClick={this.addCart.bind(this,item)}
                                         style={{backgroundColor: '#FF9A00',border: '1px solid #FF9A00'}} type='button' className='btn btn-warning'> Add to Cart </button>

                                         {/* ad cart modal ki body starting here */}
                                         
                                         <div style={{overflow: 'scroll',}} class="modal" id='addCartModal' tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 style={{textAlign: 'center !important'}} class="modal-title" id="exampleModalLongTitle">
                                                      Vadharya                                                       
                                                    </h1>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body loginmodal">

                                                    <ul className='registerHead' >
                                                         <li onClick={this.registerToggle.bind(this)} >REGISTER </li>
                                                         <li onClick={this.loginToggle.bind(this)} >SIGN IN </li>
                                                    </ul>
                                                    {this.state.loginToggle==false?(

                                                    <form  noValidate onSubmit={this.onCreateAccount}>
                                                        {/*  Register Credentials     */}
                                                    <div class="form-group loginInput">
                                                        <input 
                                                        onChange={this.onChangeRegister}
                                                        value={this.state.email}
                                                        name='email'
                                                        type="email" 
                                                        id="exampleInputEmail1" 
                                                        aria-describedby="emailHelp"
                                                        className={classnames("form-control", {
                                                            invalid: errors.email || errors.emailnotfound
                                                          })} 
                                                        placeholder="Enter email"/>
                                                        <p style={{color: 'red'}} id="emailHelp" class="">{errors.email}</p>
                                                        <br/>
                                                    </div> 

                                                     <div class="form-group loginInput">
                                                        <input 
                                                        onChange={this.onChangeRegister}
                                                        name='password'
                                                        type="password" 
                                                        value={this.state.password}  
                                                        id="exampleInputPassword1" 
                                                        aria-describedby="emailHelp"
                                                        className={classnames("form-control", {
                                                            invalid: errors.password
                                                          })} 
                                                        placeholder="Enter password"/>
                                                        <p style={{color: 'red'}} id="emailHelp" class="">{errors.password}</p>                                                        
                                                        <br/>
                                                    </div>     

                                                    <button  type="submit" class="btn btn-lg btn-block logBtn">CREATE ACCOUNT</button>
                                                    <br/>
                                                    <p style={{padding: '0px 16px'}} >By creating an account, you agree to the <span style={{color:'blue'}} > AliExpress.com Free Membership Agreement </span> and <span style={{color:'blue'}} > Privacy Policy </span> </p>
   
                                                    <h3 style={{color:'#999999', fontWeight: '400', marginTop: '30px',textAlign:'center'}} > Quick access with </h3>
                                                    </form>
                                                    ) :
                                                (
                                                    <form noValidate onSubmit={this.onSignUp}>

                                                    {/* Login Credentials     */}
                                                    <div class="form-group loginInput">
                                                        <input 
                                                        onChange={this.onChangeLogin}
                                                        value={this.state.email}
                                                        name='email'
                                                        type="email" 
                                                        id="exampleInputEmail1" 
                                                        aria-describedby="emailHelp"
                                                        className={classnames("form-control", {
                                                            invalid: errors.loginEmail || errors.loginEmailnotfound
                                                          })} 
                                                        placeholder="Enter email"/>
                                                        <p style={{color: 'red'}} id="emailHelp" class="">{errors.loginEmail}{errors.loginEmailnotfound}</p>
                                                        <br/>
                                                    </div> 

                                                     <div class="form-group loginInput">
                                                        <input 
                                                        onChange={this.onChangeLogin}
                                                        name='password'
                                                        type="password" 
                                                        value={this.state.password} 
                                                        id="exampleInputPassword1" 
                                                        aria-describedby="emailHelp" 
                                                        className={classnames("form-control", {
                                                            invalid: errors.loginPassword || errors.loginPasswordincorrect
                                                          })}
                                                        placeholder="Enter password"/>
                                                        <p style={{color: 'red'}} id="emailHelp" class="">{errors.loginPassword}{errors.loginPasswordincorrect}</p>                                                        
                                                        <br/>
                                                    </div>     

                                                    <button  type="submit" class="btn btn-lg btn-block logBtn">SIGN IN</button>
                                                    <br/>
                                                    <p>Forgot Password?</p>
   
                                                    </form>
                                                )}

                                                </div>
                                                {/* <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div> */}
                                                 </div>
                                             </div>
                                          </div>
                                         

                                        <button className='wishKaButton btn' >  <i class="fa fa-heart-o" aria-hidden="true"></i> 5</button>
                                    </div>

                                    <h4 style={{fontWeight: '600'}} >5 day Buyer Protection </h4>
                                    <h5> <i class="fa fa-heart-o" aria-hidden="true"></i>Money back gurantee</h5>

                                </div>
                            </div>
                        </div>
                </div>
                
                {/* Product Body Section Second */}
                <div className='forBack' >
                 <div className='prodlowerBody'>
                    <div className='gridContainer2' >
                        <div className='lowerItem1' >
                            <div className='lowerL1' >
                                <h4 style={{fontWeight: '600'}} > Store Name </h4>
                                <p> 99%  <span style={{color: '#999999'}} > Positive FeedBack </span>  </p>                                
                                <p> 22  <span style={{color: '#999999'}} > Follower </span>  </p>                                
                                <p>   <span style={{color: '#2E9CC3'}} > Contact </span>  </p>                                
                                <button className='sbtn1' >+Follow</button>
                                <button className='sbtn2'>Visit Store</button>
                            </div>

                            <div className='lowerL2' >
                                <h4 style={{fontWeight: '600'}} > Store Categories </h4>
                                    <ul  className='storeCategoryLOwer' >
                                        <li>Hiking Shoes</li>
                                        <li>Others</li>
                                    </ul>
                            </div>
                        </div>

                        <div className='lowerItem2' >
                             <div className='lowerR1' >
                               <ul className='lowerRNav' >
                                <li onClick={this.overview.bind(this)} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">OVERVIEW</li>
                                <li onClick={this.review.bind(this)} data-toggle="collapse" href="#reviews" role="button" aria-expanded="false" aria-controls="collapseExample"> CUSTOMER OVERVIEWS (6)</li>
                                <li onClick={this.specs.bind(this)} data-toggle="collapse" href="#specs" role="button" aria-expanded="false" aria-controls="collapseExample">SPECIFICATIONS</li>
                                <li className='reportClass' >Report Item</li>
                               </ul>
                                    <hr style={{borderBottom: '1px solid #999999'}}/>

                             {/* Collapse On Button starts here */}
                                    {/* overview collapse */}
                            {this.state.overview==false?null: (

                             <div className=" Overview" id="collapseExample">
                                    <img src={prod3} width='600' height='600'  /><br/>
                                    <img src={prod3} width='600' height='600'  /><br/>
                                    <img src={prod3} width='600' height='600'  /><br/>
                                    <img src={prod3} width='600' height='600'  /><br/>
                                    <img src={prod3} width='600' height='600'  /><br/>
                                    
                             </div>   
                            )}
                                    {/* review collapse */}
                            {this.state.reviews==false?null:(

                                <div className=" reviews" id="reviews">
                                   <h3>Customer Reviews (6) </h3>  

                                   <div className='col-lg-12' >
                                        <div className='col-lg-6' >
                                          <p style={{color: 'black'}} > 5 Start
                                           <span className='midLine' > ....................................... </span> 
                                           <span className='revPer' >100% </span> </p>
                                           <p style={{color: 'black'}} > 4 Start
                                           <span className='midLine' > ....................................... </span> 
                                           <span className='revPer' >100% </span> </p>
                                           <p style={{color: 'black'}} > 3 Start
                                           <span className='midLine' > ....................................... </span> 
                                           <span className='revPer' >100% </span> </p>
                                           <p style={{color: 'black'}} > 2 Start
                                           <span className='midLine' > ....................................... </span> 
                                           <span className='revPer' >100% </span> </p>
                                           <p style={{color: 'black'}} > 1 Start
                                           <span className='midLine' > ....................................... </span> 
                                           <span className='revPer' >100% </span> </p>
                                        </div>  

                                        <div className='col-lg-6' style={{marginTop: '50px'}} >
                                                <h4>5.0 <span style={{fontSize: '16px',color: '#999999', paddingRight: '10px'}} > /5 </span>
                                                 <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                                 </h4>
                                        </div>

                                   </div>   

                                    <div style={{textAlign: 'center'}} >
                                        <h3>No Feedback </h3>
                                    </div>
                               
                              </div>
                                )}
                                 {/* review collapse */}
                            {this.state.specs==false?null:(

                                <div className=" specs " id="specs">
                                   specs                                    
                              </div>
                            )}
                            </div>
                            
                            
                        {/* Product Seller Recomendation section */}
                        
                            <div>
                                <h4 style={{fontWeight: '600', marginBottom: '10px'}} > Seller Recomendations </h4>
                            </div>

                            <div>
                                <SellerRecomendations />
                            </div>
                        </div>
                    </div>
                </div>


                <div>

                </div>

                </div>

            </div>
          )
        }  ;
    }
}
Product.propTypes = {
    registerUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => {
    console.log('Single Product StateToProps----',state);
    return{
        products:state.products.products,
        loading:state.products.loading,
        auth: state.auth,
        errors: state.errors
    }
}

 
export default connect(
    mapStateToProps,
    {getProducts, registerUser, loginUser, addToCart}
)(Product);