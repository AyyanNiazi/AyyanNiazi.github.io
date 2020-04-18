import React,{Component} from 'react';
import SellerRecomendations from './sellerRecomendations'
import Product from './product'
import './style/product.css'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import StoreHome from '../../Vendorstore/storeHome';

class ProductNavItems extends Component {
  

    render() { 
        return (    
            <div className='prodMainTop' >
                {/* Store Name */}

                <div className='' >
                    <h4 className ='storeName' >My Store 4130</h4>
                </div>

                {/* Product Navbar */}

                <div className='productNav' >
                    <ul className='productUl' >
                        <li>
                            <Link  to='/product/storeHome'>Store Home</Link>
                        </li>
                        <li>
                            <Link  to='/product'>Products</Link>
                        </li>
                        <li>
                            <Link  to='/product/storeHome'>Sale item</Link>
                        </li>
                        <li>
                            <Link  to='/product/storeHome'>Top Selling</Link>
                        </li>
                        <li>
                            <Link  to='/product/storeHome'>Feedback</Link>
                        </li>
                    </ul>
                </div>

                
                {/* product Body Section */}

               
            </div>
          );
    }
}
 
export default ProductNavItems;