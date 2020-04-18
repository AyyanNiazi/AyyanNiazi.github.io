import React,{Component} from 'react';
import prod1 from '../dynamic/images/ban2.png'
import prod2 from '../dynamic/images/prod1.png'
import prod3 from '../dynamic/images/prod2.png'
import prod4 from '../dynamic/images/prod3.png'
import prod5 from '../dynamic/images/prod4.png'
import './style/storeHome.css'

class StoreHome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='row' >
                <div className='container' >
                    <div className='bannerImage' >
                        <img src={prod1} width='1200' height='500' />
                    </div>
                    {/* Banners end here */}
                    <div className='storeProduct col-lg-3' >
                        <img src={prod2} width='270' height='270' />
                        <br/>
                        <p style={{textAlign: 'justify'}} >25/5000 hello food Super hard cross countersunk head self-tapping screws furniture wood screws fast coarse teeth </p>
                          <h4  > <span style={{fontWeight: '700', textAlign: 'left',paddingRight:'6vw'}}><i>PKR 2300.76</i></span> <span style={{fontWeight: '700',color: '#999999', textAlign: 'right',fontSize: '14px'}}> 24 sold </span> </h4> 
                    </div>

                    <div className='storeProduct col-lg-3' >
                        <img src={prod3} width='270' height='270' />
                        <br/>
                        <p style={{textAlign: 'justify'}} >25/5000 hello food Super hard cross countersunk head self-tapping screws furniture wood screws fast coarse teeth </p>
                          <h4  > <span style={{fontWeight: '700', textAlign: 'left',paddingRight:'6vw'}}><i>PKR 2300.76</i></span> <span style={{fontWeight: '700',color: '#999999', textAlign: 'right',fontSize: '14px'}}> 10 sold </span> </h4> 
                    </div>

                    <div className='storeProduct col-lg-3' >
                        <img src={prod4} width='270' height='270' />
                        <br/>
                        <p style={{textAlign: 'justify'}} >25/5000 hello food Super hard cross countersunk head self-tapping screws furniture wood screws fast coarse teeth </p>
                          <h4  > <span style={{fontWeight: '700', textAlign: 'left',paddingRight:'6vw'}}><i>PKR 2300.76</i></span> <span style={{fontWeight: '700',color: '#999999', textAlign: 'right',fontSize: '14px'}}> 0 sold </span> </h4> 
                    </div>

                    <div className='storeProduct col-lg-3' >
                        <img src={prod5} width='270' height='270' />
                        <br/>
                        <p style={{textAlign: 'justify'}} >25/5000 hello food Super hard cross countersunk head self-tapping screws furniture wood screws fast coarse teeth </p>
                          <h4  > <span style={{fontWeight: '700', textAlign: 'left',paddingRight:'6vw'}}> <i>PKR 2300.76</i> </span> <span style={{fontWeight: '700',color: '#999999', textAlign: 'right',fontSize: '14px'}}> 130 sold </span> </h4> 
                    </div>


                </div>
            </div>
         );
    }
}
 
export default StoreHome;