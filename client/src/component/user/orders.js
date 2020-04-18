import React,{Component} from 'react';
import UserNavbar from './userNavbar';
import './style/order.css'
import user from '../dynamic/images/admin.png'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            < >
               <div className='' >
                <h2> Orders </h2>

                <div className='col-12' id='orderFilter'>
                    <h3>Filters</h3>
                    <ul id='orderUl' >
                        <li> Order Number: <input type='text' placeholder='pent' />  </li>
                        <li> Product: <input type='text' placeholder='123895' />  </li>
                        <li> <button className='btn btn-warning' >Filter</button> </li>
                        <li> 
                        <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="collapse" data-target="#filter" aria-expanded="false" aria-controls="collapseExample">
                            More Filter
                        </button>
                        </li>
                    </ul>
                    <div class="collapse" id="filter">
                        <div class=" card-body" style={{padding:'0px'}} >
                            <ul id='orderUl' >
                                <li> Seller Name: <input type='text' placeholder='Arslan' />  </li>
                                <li> Tracking Number: <input type='text' placeholder='123895' />  </li>
                                <li> Order status: 
                                    <select>
                                        <option>All orders</option>
                                        <option>Pending</option>
                                        <option>Completed</option>
                                        <option>Delivered</option>
                                    </select>
                                 </li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
                            {/* Orders Showing */}
                <div className='col-12' id='orderFilter' style={{marginTop:'20px',padding:'20px'}} >
                    <div className='row' style={{backgroundColor:'#f0eeee',padding:'10px'}}>
                        <div className='col-5' >
                            <p>Product</p>
                        </div>
                        <div className='col-3' >
                         <p>Product Action </p>
                        </div>
                        <div className='col-2' >
                            <p> Order Status </p>
                        </div>
                        <div className='col-2' >
                        <p> Order Status </p>

                        </div>
                    </div>
          
                    <div className='row' style={{backgroundColor:'#f0eeee',padding:'10px',marginTop:'5px'}}>
                        <div className='col-4' >
                          <p>Order Id: <span style={{color:'#999'}} > 8010393523724364 </span>   </p>
                          <p>Order time:  <span style={{color:'#999'}} > 07-03-2020/ 7:58 p.m </span>   </p>
                        </div>
                        <div className='col-4' >
                         <p>Store Name:  <span style={{color:'#999'}} > Arslan Trader </span> </p>
                         <p>Visit Seller  <span style={{color:'#999'}} >| </span>  Contact Seller </p>
                        </div>
                        <div className='col-2' >
                            <p> Order Status </p>
                        </div>
                        <div className='col-2' >
                         <p>Ammount:  <span style={{color:'#999'}} > <i className='fa fa-dustbin' ></i> </span> </p>
                          <p>PKR 2300</p>
                        </div>
                    </div>

                    <div className='row' style={{padding:'10px',marginTop:'5px'}}>
                        <div className='col-5' >
                            <div className='row' >
                                <div className='col-lg-3' >
                                    <img  src={user} width='60' height='60' />
                                </div>
                                <div className='col-lg-9 col-xs-12 col-sm-12' >
                                    <span>CURREN Luxury Brand Men Analog Leather Sports Watches Men's Army Military Watch Male </span><br/><br/>
                                    <span> PKR 230x2 </span><br/>
                                    <span style={{color:'#999'}} > Product properties: Gold Black </span><br/>
                                    <span> <i className='fa fa-truck' style={{color:'dodgerblue'}} ></i> </span>
                                </div>
                            </div>
                        </div>
                        <div className='col-3' >
                         <p>no Payment </p>
                        </div>
                        <div className='col-2' >
                            <p> On the way </p>
                        </div>
                        <div className='col-2' >
                            <button className='btn btn-danger' > Add to cart </button>                        
                        </div>
                    </div>
               </div> 
               
             </div>
            </>
         );
    }
}
 
export default Dashboard;