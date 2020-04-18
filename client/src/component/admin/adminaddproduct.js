import React,{Component} from 'react';
import StoreApprovals from './approvals/storeApprovals'
import ProductApprovals from './approvals/productApprovals'
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import './style/landingPage.css'
import { connect } from 'react-redux';
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
class AdminAddproduct extends Component {
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



    render() { 
        return ( 
            <div>
              <div className='row' >
                    <div className='col' >
                        <div className='addProdImage'   >
                           <div className='addimgCenter' >
                                <i class="fa fa-cloud" style={{color: '#c7c3c3', fontSize: '60px'}} ></i>
                                <p>Upload Product Cover Image</p>
                                {/* <input type='file' style={{display: 'none'}} ref="fileUploader" onChange={this.imageOnChange} /> */}
                           </div>  
                           {/* {this.state.imagePicker!==true? void 0: (<input type='file' />)}                          */}
                        </div>
                    </div>
                <div className='col' >

                </div>
                <div className='col' >

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
)(AdminAddproduct);