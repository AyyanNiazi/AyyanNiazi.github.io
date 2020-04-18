import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom'
import {storeInfo,getVendorProducts} from '../../store/actions/vendor/storeAction'
import AddProduct from './vendorAddProduct'
import './style/dashboard.css'
import VendorDashboard from './vendorDashboard';
import VendorProducts from './vendorProducts';
import EditProduct from './productActions/editProfuct';
import VendoOrders from './orders';
import Coupons from './Coupons';
import Reports from './reports';
import VendorSetting from './setting';
import axios from 'axios';


class VendorLandingPage extends Component{
    constructor(){
        super();
        this.state={
            isApproved: false,
            isStore:false,
        }

    }
    
    componentDidMount() {

        if(this.props.storeId){
            axios.get(`/api/vendor/getStore/${this.props.storeId}`) 
            .then(res => {
                

                console.group(res.data)
                this.props.storeInfo(res.data[0])

                    this.setState({
                        isStore: true
                    })
                    // let finalFIlterd = res.data.filter(e => {
                    //     return  e.storeStatus !== 'pending'
                    // })
                    
                    if( res.data && res.data[0].storeStatus==='approved'){

                        // console.log('dusra filtere',finalFIlterd)
                        this.setState({
                            isApproved: true
                        })
                    }
                    else{
                        this.setState({
                            isApproved: false
                        })
                    }  
            })
            .catch(err => {
                console.log(err.message)
            })
        } 
        
    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.IsApproved){
        //     axios.get('/api/admin/getStore') 
        //     .then(res => {
                
    
        //         let filtered = res.data.filter(e => {
        //             return e.storeId === nextProps.IsApproved.id
        //         })
        //         console.log(filtered)
        //         // if(filtered)
        //         this.setState({
        //             isApproved: true
        //         })
        //     })
        // }
    }


    render(){
        console.log('yahi chahye')
        return(
            <div className=''>   
                <div className='row' >
                    <div className='col-lg-12 ' >
                        <BrowserRouter>                        
                            <div className='col-lg-2 col-md-2' style={{padding: '0px'}} >
                                <ul className='sideNavbar'>
                                    <li><Link to='/vendor/landingPage'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
                                    </li>
                                    <li><Link to='/vendor/product' >
                                        <i style={{marginRight: '10px'}} class="fa fa-product-hunt" aria-hidden="true"></i> products</Link>
                                    </li>
                                    <li><Link to='/vendor/orders' >
                                        <i style={{marginRight: '10px'}} class="fa fa-first-order" aria-hidden="true"></i> Orders</Link>
                                    </li>
                                    <li><Link to='/vendor/coupons' >
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Coupons</Link>
                                    </li>
                                    <li><Link to='/vendor/reports'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Reports</Link>
                                    </li>
                                    <li><Link to='/vendor/reviews'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Reviews</Link>
                                    </li>
                                    {/* <li><Link to='/vendor/withdraw'>
                                        <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> Dekhengy kal ko</Link>
                                    </li> */}
                                    <li><Link to='/vendor/setting'>
                                        <i style={{marginRight: '10px'}} class="fa fa-wrench" aria-hidden="true"></i> Settings</Link>
                                    </li>

                                </ul>
                            </div>

                        {this.state.isStore===false ? <p style={{color: 'red',fontSize: '16px'}} >Please Make A store for further process</p> :
                        this.state.isApproved!==false ?
                         (   <div className='col-lg-9 ' style={{marginTop: '10px'}} >
                            <Switch>
                                <Route exact path='/vendor/landingPage' component={VendorDashboard} />
                                <Route  path='/vendor/product' component={VendorProducts} />
                                <Route  path='/vendor/productAction' component={EditProduct} />
                                <Route exact path='/vendor/orders' component={VendoOrders} />
                                <Route exact path='/vendor/coupons' component={Coupons} />
                                <Route exact path='/vendor/reports' component={Reports} />
                                <Route exact path='/vendor/setting' component={VendorSetting} />
                                <Route exact path='/vendor/addProduct' component={AddProduct} />
                                {/* <Route  path='/vendor/product' component={AddProduct} /> */}
                            </Switch>
                            </div>)                            
                            :
                            <p style={{color: 'red',fontSize: '16px'}} > Your Store is under approveal After Approval you can acces your portal. For further inquiry please call at 03070084689 </p>}
                        </BrowserRouter>

                        {/* <div className='col-lg-9' >
                            <AddProduct />
                        </div> */}

                    </div>
                </div>
            </div>
        );
    }


}

// redux

const mapStateToprops =state => {
    console.log(state);
    
    return {
        IsApproved: state.auth.user,
        storeId:state.auth.user.id,
    }
}
export default connect(
    mapStateToprops,
    {storeInfo,getVendorProducts}
)(VendorLandingPage)