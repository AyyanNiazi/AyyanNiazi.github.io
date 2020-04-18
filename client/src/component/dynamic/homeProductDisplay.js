import React from 'react';
import prod1 from './images/prod1.png'
import prod2 from './images/prod2.png'
import prod3 from './images/prod3.png'
import prod4 from './images/prod4.png'
import prod5 from './images/prod5.png'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class HomeProductDisplay extends React.Component{ 

    constructor(){
        super();
        this.state={
            products:undefined,
            loading:true,
        }
    }

    componentDidUMount(){
        if(this.props.products){
            this.setState({
                products:this.props.products,
                loading:false
            })
         }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({
                products:nextProps.products,
                loading:false,
            })
         }
    
    }



  render() {
  return (
    <div className="">
            <div className='row' >
                <div className='col-lg-12' >
                    {this.state.products==undefined?(<h3>Loading...</h3>):(
                      this.state.products.map((item,index) => {  
                        return(  
                        <div key={item._id} className='col-lg-2 col-sm-6 col-xs-6 col-md-2 prodImage' > 
                                <div className='' >
                                    <Link style={{textDecoration:'none'}} to={`/product/${item._id}`}><img style={{borderRadius: '12px'}}title={item.name} src={item.image[0]} width='226.5' height='250.5' /></Link>
                                        <br/>
                                    {item.discountedPrice?(
                                     <div>       
                                    <h2 style={{fontWeight: '800'}}>PKR {item.discountedPrice}</h2>
                                    <h2 className='prevPrice'><del> PKR {item.price}</del></h2>
                                    </div>
                                    ):(<div>       
                                        <h2 style={{fontWeight: '800'}}>PKR {item.price}</h2>
                                        <br/>
                                        </div>)}
                                </div>
                        </div>)
                    })
                    // <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 prodImage'> 
                    //          <div className='' >
                    //             <img style={{borderRadius: '12px'}} src={prod2} width='226.5' height='250.5' />
                    //                 <br/>
                    //             <h2 style={{fontWeight: '800'}}>PKR 890</h2>
                    //             <h2 className='prevPrice'><del> PKR 750</del></h2>
                    //         </div>
                    // </div>
                    // <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 prodImage'> 
                    //          <div className='' >
                    //             <img className='' style={{borderRadius: '12px'}} src={prod3} width='226.5' height='250.5' />
                    //                 <br/>
                    //             <h2 style={{fontWeight: '800'}}>PKR 890</h2>
                    //             <h2 className='prevPrice'><del> PKR 750</del></h2>
                    //         </div>
                    // </div>
                    // <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 prodImage'> 
                    //         <div className='' >
                    //             <img style={{borderRadius: '12px'}} src={prod4} width='226.5' height='250.5' />
                    //                 <br/>
                    //             <h2 style={{fontWeight: '800'}}>PKR 890</h2>
                    //             <h2 className='prevPrice'><del> PKR 750</del></h2>
                    //         </div>
                    // </div> 
                    //      <div className='col-lg-2 col-sm-6 col-xs-6 col-md-2 prodImage'> 
                    //          <div className='' >
                    //             <img style={{borderRadius: '12px'}} src={prod5} width='226.5' height='250.5' />
                    //                 <br/>
                    //             <h2 style={{fontWeight: '800'}}>PKR 890</h2>
                    //             <h2 className='prevPrice'><del> PKR 750</del></h2>
                    //         </div>
                    // </div>
                   )}
                </div>
            </div>
    </div>
  );
}
}


const mapStateToProps=(state)=>{
    console.log('Home products====',state);
    return{
        products : state.products.products,
        loading : state.products.loading
    }
}

export default connect(
    mapStateToProps,
    null
)(HomeProductDisplay);
