import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import UserNavbar from './userNavbar';
import Dashboard from './dashboard'
import Orders from './orders'
import UserSetting from './userSetting'
import './style/userLandingPage.css'

class UserlandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            < >
               <div id='userLandingPage' >

                <BrowserRouter>
                <UserNavbar/>
                    <div className='container' style={{marginTop:'15px'}} >
                        <div className='row' >
                            <div className='col-3' id='mainLeft'  >
                                <h4>Shortcuts</h4>
                                <ul id='userUl' >
                                    <li>My Orders </li>
                                    <li>Manage Feedbacks </li>
                                    <li>My Coupons  </li>
                                    <li>Message Center  </li>
                                    <li>Recently Viewed Products </li>
                                    <li>My Shipping Address </li>
                                    <li>Change Passwords </li>
                                    <li> Manage Reports </li>
                                </ul>
                            </div>

                            <div className='col-9' >
                               <Switch>
                                <Route path='/user/landingPage'  component={Dashboard}/>
                                <Route path='/user/orders'  component={Orders}/>
                                <Route path='/user/setting'  component={UserSetting}/>
                                {/* <Route path='/user/landingPage'  component={Dashboard}/> */}
                              </Switch>
                            </div>
                        </div>
                    </div>
                    
                </BrowserRouter>
               </div> 

            </>
         );
    }
}
 
export default UserlandingPage;