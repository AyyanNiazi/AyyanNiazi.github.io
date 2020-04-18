import React,{Component} from 'react';
import UserNavbar from './userNavbar';
import './style/dashboard.css'
import user from '../dynamic/images/female.png'

class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            < >
               <div className='row' >
                    <div className='col-12' id='dashboardMain' style={{paddingTop:'20px'}} >
                        <div className='row' >
                            <div className='col-lg-2' >            
                              <div>  <img src={user} width='100' heigh='100' />  <br/> <span></span>  </div>                                                               
                            </div>  
                            <div className='col-lg-3' >
                               <p> Muhammad Arslan </p>
                               <span>chill kar old name</span>
                               <p> <span style={{color:'#999'}} > Come on say something </span> </p>
                                   
                            </div>
                            <div className='col-3' style={{textAlign:'center'}} >
                                 <span style={{textAlign:'center'}} >  0 <br/>  Following </span>
                            </div>  
                            <div className='col-3'  style={{textAlign:'center'}}>
                                <span style={{textAlign:'center'}}>  0 <br/>  Following </span>
                            </div>
                        </div>


                       
                    </div>
               </div> 

            </>
         );
    }
}
 
export default UserSetting;