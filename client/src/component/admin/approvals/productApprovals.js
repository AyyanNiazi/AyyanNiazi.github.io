import React,{Component} from 'react';
import './style/productApprovals.css'
import { connect } from 'react-redux';
import {productApprovals,getProducts} from '../../../store/actions/adminAction';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
class ProductApprovals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: true,
            option: false,
            inventory: false,
            shipping: false,
            attributes: false,
            product: undefined,
            productStatus:'',
            index:'',
         }

        }
    componentDidMount() {
        this.props.getProducts()     
    }   

    // componentWillReceiveProps(){
    //     this.props.getProducts()     

    // }

productApprovals(id,e){
    e.preventDefault();

    let productApprovals = {
        id,
        productStatus:this.state.productStatus,
    }

    this.props.productApprovals(productApprovals);
    console.log(ProductApprovals)
}

    render() { 
        let products = []
        if(this.props.products){
            products=this.props.products
        }
        console.log(this.state)
        return ( 
            <div>
                 <div className='container ' id='prodApproval'  >

                    <div className='row' >
                        <div className='col' id='cold' >
                            
                            <h2>Store Name</h2><br/>
                            <p> <img src='' width='60' height='60' style={{borderRadius:'8px'}} /> Product Name</p>
                            <p>Product price</p>
                            <p>date Time</p>
                            <p>Status Pending</p>                            
                            <button className='btn btn-success btn-block' >Approved</button>

                            {/* Drop down */}

                            
                        </div>
                        <div className='col' id='cold' >
                        
                        </div>
                        <div className='col' id='cold'>

                        </div>
                        <div className='col' id='cold'>

                        </div>
                    </div>

                    <div className='container' style={{marginTop:'20px'}} >
                        <div className='row' >
                            <div className='col' >
                                <div className='row' >
                                    <div className='col-3' id='bottomLeft' >
                                       
                                    </div>
                                    <div className='col-8' id='bottomRight'>
                                        adsdd
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <table class="table">
                        <thead>
                            <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Item </th>
                            <th scope="col">Product Name</th>
                            <th scope="col">store Name</th>
                            <th scope="col">Inventory</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !products ? (<p>Loading.....</p>)
                                :
                                products.map((item,index) => {
                                    return (
                                        <tr key={index} >
                                            <td> {index+1} </td>
                                            <td> { item.inventory.map((i,ind) => { return <img src={i.image} height='60' height='60' /> }) } </td>
                                            <td> {item.name} </td>
                                            <td> {item.storeName} </td>
                                            <td> { item.inventory.map((i,ind) => { return <span>Color: {i.color} [ 
                                            {  i.sizeViseStock.map((e,indd) => {
                                                    return (<span> <span style={{color: 'black',fontWeight:'600'}} > Size: </span> {e.size} <span style={{color: 'black',fontWeight:'600'}} > Stock: </span> {e.stock}  </span>)
                                                
                                              }) }
                                            ]<br/> </span>  }) } </td>                                         
                                            <td> {item.date} {item.time} </td>
                                            <td> <select value={this.state.index === index?this.state.productStatus : void 0} onChange={(e,index) => {this.setState({ productStatus:e.target.value,index:index })}} >
                                                {<option value={item.productStatus} > {item.productStatus} </option>}
                                                <option value='complete' > Complete </option>
                                                <option  value='reject'> Reject </option>
                                                </select> </td>
                                            <td> <button className='btn btn-success btn-block' onClick={this.productApprovals.bind(this,item._id)}> Complete </button></td>
                                        </tr>
                                    )
                                })
                            }                 
                        </tbody>
                    </table>
                 */}
                
                </div>
            </div>
        )
    }
}

// redux
const mapStateToProps = state => {
    console.log(state)
    return {
        isLogin: state.products,
        userType: state.auth.user.userType==='admin',
        products:state.admin.products
    }
}
export default connect(
 mapStateToProps,{productApprovals,getProducts}
)(ProductApprovals);