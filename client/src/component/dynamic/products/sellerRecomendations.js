import React,{Component} from 'react';
import prod3 from '../images/prod3.png'
import prod2 from '../images/prod2.png'
import prod4 from '../images/prod4.png'
import prod1 from '../images/prod1.png'
import prod5 from '../images/prod5.png'
import './style/product.css'

class SellerRecomendations extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                 <div className='row' >
                <div className='col-lg-12' >
                    <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 sellerProdImage' > 
                            <div className='' >
                                <img style={{borderRadius: '12px'}} src={prod1} width='190' height='190' />
                                    <br/>
                                <p>Mens Hiking Shoes  </p>
                                <h4 style={{fontWeight: '600'}} className='prevPrice'>PKR 2300</h4>
                            </div>
                    </div>
                    <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 sellerProdImage'> 
                             <div className='' >
                                <img style={{borderRadius: '12px'}} src={prod2} width='190' height='190' />
                                    <br/>
                                <p>Mens Hiking Shoes  </p>
                                <h4 style={{fontWeight: '600'}} className='prevPrice'>PKR 2300</h4>
                            </div>
                    </div>
                    <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 sellerProdImage'> 
                             <div className='' >
                                <img className='' style={{borderRadius: '12px'}} src={prod3} width='190' height='190' />
                                    <br/>
                                <p>Mens Hiking Shoes  </p>
                                <h4 style={{fontWeight: '600'}} className='prevPrice'>PKR 2300</h4>
                            </div>
                    </div>
                    <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 sellerProdImage'> 
                            <div className='' >
                                <img style={{borderRadius: '12px'}} src={prod4} width='190' height='190' />
                                    <br/>
                                <p>Mens Hiking Shoes  </p>
                                <h4 style={{fontWeight: '600'}} className='prevPrice'>PKR 2300</h4>
                            </div>
                    </div> 
                         <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 sellerProdImage'> 
                             <div className='' >
                                <img style={{borderRadius: '12px'}} src={prod5} width='190' height='190' />
                                    <br/>
                                <p>Mens Hiking Shoes  </p>
                                <h4 style={{fontWeight: '600'}} className='prevPrice'>PKR 2300</h4>
                            </div>
                    </div>
                </div>
            </div>
            </div>
         );
    }
}
 
export default SellerRecomendations;