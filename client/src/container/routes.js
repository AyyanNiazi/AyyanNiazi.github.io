import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../store/actions/authActions";
import store from "../store/store";
import Navbar from '.././component/static/navbar'
import Footer from '.././component/static/footer'
import Home from '.././component/dynamic/home'
import Test from '.././component/dynamic/test'
import VendorLandingPage from '../component/vendor/vendorLandingPage'
import Product from '../component/dynamic/products/product';
import Cart from '../component/dynamic/cart/cart';
import StoreHome from '../component/Vendorstore/storeHome'
import { Store } from 'express-session'
import StoreNav from '../component/dynamic/products/storeNav'
import Quiz from './quiz/index.js'
import AddProduct from '../component/vendor/addProduct'
import VendorDashboard from '../component/vendor/vendorDashboard'
import AdminLogin from '../component/admin/login'
import VendorRegister from '../component/vendor/Account/register';
import VendorLogin from '../component/vendor/Account/login';
import AdminLandingPage from '../component/admin/adminlandingPage';
import VendorSignup from '../component/vendor/Account/signup';
import UserlandingPage from '../component/user/userLandingPage';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/";
    }
  }
  if (localStorage.vendorToken) {
    // Set auth token header auth
    const token = localStorage.vendorToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/";
    }
  }
  

class Routing extends Component{
    render(){
        return (
            <div>
                <BrowserRouter>
                    {/* <Navbar /> */}

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/test' component={Test} />
                        <Route exact path='/product/:id' component={StoreNav} />
                        <Route exact path='/vendor/landingPage' component={VendorLandingPage}/>
                        {/* <Route exact path='/storeHome' component={StoreHome}/> */}
                        <Route exact path='/product/storeHome' component={StoreHome}/>
                        {/* <Route exact path='/product/:id' component={Product} /> */}
                        <Route exact path='/vendor/dashboard' component={AddProduct}/>
                        <Route exact path='/cart' component={Cart}/>
                        {/* <Route exact path='/quiz' component={Quiz}/> */}
                        <Route exact path='/vendor/landingPage' component={VendorDashboard} />
                        <Route exact path='/admin' component={AdminLogin} />
                        <Route exact path='/vendor/registration' component={VendorRegister} />
                        <Route exact path='/admin/landingPage' component={AdminLandingPage} />
                        <Route exact path='/vendor/signup' component={VendorSignup} />
                        <Route exact path='/vendor/login' component={VendorLogin} />
                        <Route exact path='/user/landingPage' component={UserlandingPage} />
                        
                        
                    </Switch>

                    {/* <Footer/> */}
                </BrowserRouter>
            </div>
        )
    }
}

export default Routing