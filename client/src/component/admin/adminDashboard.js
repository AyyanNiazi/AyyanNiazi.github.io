import React,{Component} from 'react';
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import './style/dashboard.css'
import { connect } from 'react-redux';
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          
          }
    }
       
    render() { 
      
       
        return ( 
            <div className='' >
              <div className='row' id='dashboardTop' style={{margin:'0px',textAlign:'left'}} >
                <div className='col cont1' >
                   <div className='row' style={{paddingBottom: '0px',}}>
                      <div className='col' >
                          <h3>150</h3>
                          <p>New Orders</p>
                      </div>
                      <div className='col rightIcon' >
                          <i class="fa fa-shopping-bag"></i>
                      </div>
                   </div>
                   
                    <div className='row' id='moreInfo' >
                      <p  >More Info <i class="fa fa-arrow-circle-right"></i> </p>
                    </div>
                </div>
                <div className='col cont2' >
                    <div className='row'>
                      <div className='col '>
                        <h3>60%</h3>
                        <p style={{color:'white'}} >Bonuces rate</p>
                      </div>
                      <div className='col rightIcon'>
                        <i class="fa fa-signal"></i>

                      </div>
                    </div>
                    
                    <div className='row'  id='moreInfos'>
                      <p>More Info <i class="fa fa-arrow-circle-right"></i> </p>
                    </div>
                </div>
                <div className='col cont3' >

                <div className='row'>
                      <div className='col '>
                        <h3 style={{color:'white'}}>60%</h3>
                        <p style={{color:'white'}} >Bonuces rate</p>
                      </div>
                      <div className='col rightIcon'>
                        <i class="fa fa-user"></i>

                      </div>
                    </div>
                    
                    <div className='row'  id='moreInfot'>
                      <p>More Info <i class="fa fa-arrow-circle-right"></i> </p>
                    </div>
                </div>

                <div className='col cont4' >
                     <div className='row'>
                      <div className='col '>
                        <h3 style={{color:'white'}}>60%</h3>
                        <p style={{color:'white'}} >Bonuces rate</p>
                      </div>
                      <div className='col rightIcon'>
                        <i class="fa fa-user"></i>

                      </div>
                    </div>
                    
                    <div className='row'  id='moreInfof'>
                      <p>More Info <i class="fa fa-arrow-circle-right"></i> </p>
                    </div>
                </div>
              </div>

              {/* second section */}

              <div className='row' >

                  <div className='col secondSec'  >
                        sales ka giraph yhn ayga
                  </div>

                  <div className='col secondSec'  style={{marginRight:'0px'}}>
                        dusra koi graph ayga
                  </div>
              </div>

              <div className='row' style={{margin: '0px',padding:'0px'}}>
                <div className='col thirdSec'  >
                      faqs
                </div>

                <div className='col thirdSec' >
                  <div className='row' >
                    
                  </div>
                </div>
              </div>
            </div>
         );
    }
}

// redux
const mapStateToProps = state => {
    console.log(state)
    return {
        isLogin: state.auth.isAuthenticated===true,
        userType: state.auth.user.userType==='admin'
    }
}
export default connect(
 null,null
)(AdminDashboard);