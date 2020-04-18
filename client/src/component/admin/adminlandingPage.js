import React,{Component} from 'react';
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import './style/landingPage.css'
import { connect } from 'react-redux';
import AdminDashboard from './adminDashboard';
import AdminAddProduct from './adminaddproduct';
import adminApprovals from './adminApprovals';
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
class AdminLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          
          }
    }
       
    render() { 
      
       
        return ( 
            <div className='' >
              <div className='row' >
                <BrowserRouter>                     
                    <div className='col-lg-2 col-sm-0 col-xs-0' style={{height:'100%'}} >                 
                        <ul className='containerUl' >
                            <li> <Link to='/admin/landingPage' >  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link></li>
                            <li> <Link to='/admin/addProduct'>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> products</Link></li>
                            <li> <Link  to='/admin/approvals'>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Approvals</Link></li>
                            <li> <Link>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Users</Link></li>
                            <li> <Link>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Reports</Link></li>
                            <li> <Link>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> orders</Link></li>
                            <li> <Link>  <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Setting</Link></li>                     
                        </ul>
                    </div>

                    <div className='col-lg-10 col-sm-12 col-xs-12' style={{padding:'0px'}} >
                            <Switch>
                                <Route exact path='/admin/landingPage' component={AdminDashboard} />
                                <Route exact path='/admin/addProduct' component={AdminAddProduct} />
                                <Route path='/admin/approvals' component={adminApprovals} />
                            </Switch>
                    </div>
                </BrowserRouter>
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
)(AdminLandingPage);