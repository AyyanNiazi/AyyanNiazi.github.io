import React,{Component} from 'react';
import UserNavbar from './userNavbar';
import './style/dashboard.css'
import user from '../dynamic/images/admin.png'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            < >
               <div className='row' >
                    <div className='col-12' id='dashboardMain'>
                        <div className='row' >
                            <div className='col-6' >
                                <ul id='faceUl' >
                                    <li> <img src={user} width='80' heigh='80' /> </li>
                                    <li > <i className='fa fa-envelope' ></i> Unread Messages: <span style={{color:'orange',fontWeight:600}} > 2</span>  </li>
                                </ul>
                            </div>  
                            <div className='col-6' >

                            </div>
                        </div>


                        <div className='row' id='dashboardBottom'>
                        {/* <hr style={{border:'1px solid #999'}} /> */}
                            <div className='col-2' >
                                <h4 style={{color:'orange',fontWeight:600}} > 4 </h4>
                                <h5>Orders</h5>
                            </div>
                            <div className='col-2' >
                                <h4 style={{color:'green',fontWeight:600}} > 4 </h4>
                                <h5>Awaiting Payments</h5>
                            </div>
                            <div className='col-2' >
                                <h4 style={{color:'violet',fontWeight:600}} > 4 </h4>
                                <h5>Completed Orders</h5>
                            </div>
                            <div className='col-2' >
                                <h4 style={{color:'limegreen',fontWeight:600}} > 4 </h4>
                                <h5>Pending Orders</h5>
                            </div>
                            <div className='col-2' >
                                <h4 style={{color:'brown',fontWeight:600}} > 4 </h4>
                                <h5>Awaiting delivery</h5>
                            </div>
                            <div className='col-2' style={{borderRight:'0px '}}>
                                <h4 style={{color:'dodgerblue',fontWeight:600}} > 4 </h4>
                                <h5>Disputes</h5>
                            </div>
                        </div>
                    </div>
               </div> 

            </>
         );
    }
}
 
export default Dashboard;