import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {getVendorProducts,editProduct} from '../../store/actions/vendor/storeAction'
import './style/vendorProducts.css'
import prod1 from '../dynamic/images/prod1.png'
import { connect } from 'react-redux';
import axios from 'axios';

class VendorProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:undefined,
            delReady:false,
            index:''
         }
    }
//WARNING! To be deprecated in React v17. Use componentDidMount instead.
componentWillMount() {
    this.props.getVendorProducts(this.props.storeId);
}
    componentDidMount(){
        if(this.props.products){
            // setTimeout( ()=>{
                this.setState({
                    products:this.props.products
                })
            // },10 )
        }
       
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        // this.props.getVendorProducts(this.props.storeId);
        if(nextProps.products){
            this.setState({
                products:nextProps.products
            })
            // console.log(filtered)


        }
    }

    editProduct(item){
        this.props.editProduct(item)
    }

    delFirst(index){
        this.setState({
            delReady:true,
            index
        })
    }
    
    delItem(id,index){
        let key = {id}
        let filtered = this.state.products;
        axios.post('/api/vendor/delProduct/',key)
        .then(res => {
            filtered.splice(index,1)
            this.setState({products:filtered,delReady:false})            
        })
        .catch(err => {
            console.log('product delte sy error', err)
        })
    }
    render() { 
        let {products} = this.state
        // if(this.props.products){
        //     products=this.props.products
        //     console.log(products)
        //    }
           
        return ( 
            <div>
                <div className='row' >
                    <div className='col-lg-6' >
                        <ul className='productsHeaderUl' >
                            <li >All(13)</li>
                            <li> Online(25) </li>
                            <li> Pending Review(30) </li>
                            <li> Draft(20) </li>
                        </ul>
                    </div>
                    <div className='col-lg-6' >
                        <div>
                            <button style={{backgroundColor: '#FF4747',color: 'white', float: 'right',margin: '15px',fontSize: '16px',fontWeight: '500'}} className='btn' > <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> 
                            <Link to='/vendor/addProduct' Style={{color: 'white', fontSize: '16px'}} > Add Add new product </Link> </button>
                        </div>
                    </div>
                </div>
                {/* Product Section body */}

                <div className='row' >
                    <div class='col-lg-12' >
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Sku</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col">Views</th>
                                <th scope="col">Published</th>
                                </tr>
                            </thead>
                            <tbody >
                                {!products? (<p>Loading.....("_")</p>) :
                                products.map((item,index)=>{
                                    return (
                                <tr className='productRows' key={item._id}>
                                    <td scope='row' > <img src={prod1} width='60' height='60' /> </td>
                                    <td style={{color: '#FF4747'}} > 
                                    <div className='row' >
                                        <div className='col-9' >
                                            {item.name}
                                            <br/>
                                            <ul className='productActions' >
                                                <li style={{paddingleft: '0px'}} onClick={this.editProduct.bind(this,item)} > <Link style={{color: 'brown'}} className='text-decoration-none' to='/vendor/productAction' > Edit</Link></li>
                                                <li >|</li>
                                                <li  onClick={this.delFirst.bind(this,index)} >                                                
                                                    Delete Permanantly                                                    
                                                </li>
                                                <li >|</li>
                                                <li >View</li>
                                            </ul>         
                                        </div>
                                        <div className='col-3' >
                                        {!this.state.delReady? void 0 :
                                         this.state.index===index && 
                                                (
                                                    <span className='btn btn-danger' id='delItem' onClick={this.delItem.bind(this,item._id,index)} > Delete
                                                     <span id='delCancel' onClick={() => { this.setState({delReady:false}) } } >  X </span>  </span>
                                                    )
                                                }

                                        </div>
                                    </div>
                                     
                                    </td>
                                    {
                                        item.productStatus==='complete'?
                                        (
                                            <td> <span style={ {marginTop: '10px', backgroundColor: 'limegreen', color: '#ffffff',padding: '5px',fontWeight: '500'}} >Online</span> </td>
                                        ):
                                        (

                                            <td> <span style={{marginTop: '10px', backgroundColor: 'red', color: '#ffffff',padding: '5px',fontWeight: '500'}} >Ofline</span> </td>
                                        )
                                    }
                                    <td>-</td>
                                    <td style={{ color: 'limegreen',fontWeight: '600'}} >  In Stock  </td>
                                    <td> PKR {item.price} </td>
                                    <td>8</td>
                                    <td> {item.date} <br/>Published</td>
                                </tr>
                                )
                                })
                                }                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         );
    }
}
//  redux

const mapStateToprops = state => {
    console.log('vndr ki show prdct',state.vendor)
    return {
        storeId:state.vendor.storeInfo._id,
        products:state.vendor.products,
        updateProduct:state.vendor.products
    }
}
export default connect(mapStateToprops,{getVendorProducts,editProduct})(VendorProducts);