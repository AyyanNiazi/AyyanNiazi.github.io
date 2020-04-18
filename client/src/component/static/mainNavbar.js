import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './style/navbar.css'
// import Navbar from '.././component/static/navbar'

class MainNavbar extends Component{
    render(){
        return (
            <div>
                
                <div className='mainNavBottom'>
                    

                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='col-lg-2'>
                                <div >

                                    <Link className="navbar-brand logo">Vegie wala</Link>
                                    <br/>
                                    <p className='logoText'>Smarter Shopping!</p>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                        
                              <div className='inputSearchKidiv'>

                                    <div class="dropdown">
                                        <p className='searchBtn'>All Categories</p>
                                            <i class="fa fa-sort-desc searchDown" aria-hidden="true"></i>
                                        {/* <p class="dropbtn searchBtn">All Categories</p>
                                        <div class="dropdown-content">
                                            <a href="#">Seller Login</a>
                                            <a href="#">Option 2</a>
                                            <a href="#">Option 3</a>
                                        </div> */}

                                        
                                            {/* <i class="fa fa-search" aria-hidden="true"></i> */}                                       
                                    </div> 
                                    <input className='mainInputSearch' type='text' placeholder='Type to search' />

                                    {/* <span className='searchIcon'> */}
                                        <i class="fa fa-search" aria-hidden="true"></i>  
                                    {/* </span> */}
                                </div>  
                            </div>

                            <div className='col-lg-3'>

                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='col-lg-2'>
                                           
                                            <span><i class="fa fa-heart-o navWish" aria-hidden="true"></i>
                                                
                                            </span>
                                        </div>

                                        <div className='col-lg-2' >

                                            <div className='verticalLine' >
                                                <p>|</p>
                                            </div>

                                        </div>
                                        <div className='col-lg-6' style={{padding: '0px'}}>
                                          <div>
                                               <Link to='/cart'> <i class="fa fa-shopping-cart" aria-hidden="true" ></i></Link>
                                                <sup className='cartQuantity'>0</sup>
                                                <p style={{display: 'inline'}} className='cartPrice'>Shopping cart <span style={{display: ''}}>$90</span> </p>
                                                {/* <p>Shopping cart</p> */}
                                               {/* <span style={{display: 'inline'}}>cart<span className=''>oosssd</span> </span> */}
                                          </div>

                                        </div>
                                    </div>
                                </div>
                                
                              

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default MainNavbar