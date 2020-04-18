import React,{Component} from 'react';
import StoreApprovals from './approvals/storeApprovals'
import ProductApprovals from './approvals/productApprovals'
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import './style/landingPage.css'
import { connect } from 'react-redux';
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
class AdminApprovals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: true,
            option: false,
            inventory: false,
            shipping: false,
            attributes: false,

         }

        }
        edit(){
            this.setState({
            edit: true,
            option: false,
            inventory: false,
            shipping: false,
            attributes: false,
            })
        }
        option(){
        this.setState({
            edit: false,
            option: true,
            inventory: false,
            shipping: false,
            attributes: false,
        })
    }
    inventory(){
        this.setState({
            edit: false,
            option: false,
            inventory: true,
            shipping: false,
            attributes: false,
        })
    }
    attributes(){
        this.setState({
            edit: false,
            option: false,
            inventory: false,
            shipping: false,
            attributes: true,
        })
    }
    shipping(){
        this.setState({
            edit: false,
            option: false,
            inventory: false,
            shipping: true,
            attributes: false,
        })
    }



    render() { 
        return ( 
            <div>
                <div className='row' >
                        <div className='col-lg-9'>
                            <ul className='editProdUl' >
                                <li onClick={this.edit.bind(this)} className={this.state.edit!==false? '': void 0} > Products</li>
                                <li onClick={this.option.bind(this)} className={this.state.option!==false? '': void 0}>Vendor Stores</li>
                                {/* <li onClick={this.inventory.bind(this)} className={this.state.inventory!==false? '': void 0}>Inventory</li> */}
                             
                            </ul>

                            <div className='container' >
                                <div>
                                    {this.state.edit!==false? (<ProductApprovals/>):this.state.option!==false?(<StoreApprovals/>)
                                    :    void 0
                                }
                            </div>                        
                        </div>

                    </div>
                    
                 
                </div> 
            </div>
        )
    }
}

// redux
// const mapStateToProps = state => {
//     console.log(state)
//     return {
//         isLogin: state.auth.isAuthenticated===true,
//         userType: state.auth.user.userType==='admin'
//     }
// }
export default connect(
 null,null
)(AdminApprovals);