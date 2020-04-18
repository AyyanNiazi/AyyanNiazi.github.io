import React,{Component} from 'react';
import SellerRecomendations from './sellerRecomendations'
import Product from './product'
import './style/product.css'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import StoreHome from '../../Vendorstore/storeHome';
import ProductNavItems from './productNavItems';

class StoreNav extends Component {
  

    render() { 
        return (    
            <div className='prodMainTop' >

                {/* Product Navbar */}               

                <BrowserRouter>                  
                 <ProductNavItems />
                    <Switch>
                        <Route exact path='/product/:id' component={Product} />                      
                        <Route  path='/product/storeHome' component={StoreHome}/>
                    </Switch>

               
                </BrowserRouter>

               
            </div>
          );
    }
}
 
export default StoreNav;