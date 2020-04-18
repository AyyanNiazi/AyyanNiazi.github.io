import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import HomeProductDisplay from './homeProductDisplay'
import HomeFooter from './homeFooter'
import './style/home.css'
import ban1 from './images/ban1.png'
import ban2 from './images/ban2.png'
import ban3 from './images/ban3.png'
import clot1 from './images/clot1.png'
import clot2 from './images/clot2.png'
import clot3 from './images/clot3.png'
import clot4 from './images/clot4.png'
import ali4 from './images/ali4.png'
import { connect } from 'react-redux'
import {getProducts} from '../../store/actions/productsAction'


class Home extends Component{
    constructor(){
        super();
        this.state={
            loading:true,
            products:undefined,
        }
    }
    componentDidMount(){
        this.props.getProducts('Home');
    }


    render(){
        return (
            <div> 
               {/* Container of bootstrap */}

               <div classname='row homeTop '>
                   <div className='col-lg-12 bannerCenter'>
                       <div className='col-lg-2 col-xs-0 col-sm-0' style={{paddingRight: '0px',paddingLeft: '10px'}}>
                            {/* Category */}

                            <div  className='categTop' >
                                <h3 style={{paddingLeft: '8px'}}>Categories</h3>
                            </div>

                            <div>
                                <ul className='categUl'>
                                    <li>Womens Clothing</li>
                                    <li>Mens Clothing</li>
                                    <li>kids Clothing</li>
                                    <li>Kurtas</li>
                                    <li>Stitched Clothes</li>
                                    <li>Un-Stitched Clothes</li>
                                    <li>Embroidery</li>
                                    <li>Fashion</li>
                                    <li>Bride</li>
                                    <li>Groom</li>
                                    <li>Desi</li>
                                    <li>Desi</li>
                                    <li>Desi</li>
                                </ul>
                            </div>
                       </div>

                       <div className='col-lg-8 ' style={{paddingLeft: '0px',paddingRight: '0px'}}> 
                                <div className='centerBannerHeader'>
                                    <ul className='centerBanner'>
                                        <li>Super value</li>
                                        <li>Big Discounts</li>
                                        <li>Select Coupuns</li>
                                        <li>Home</li>
                                        <li>Beautiful</li>
                                        <li>Embroidery</li>
                                        
                                    </ul>
                                </div>

                                {/* carousel startinh from here */}
                                
                                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel ">
                                    <ol class="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                    <div class="carousel-inner customCarousal">
                                        <div class="carousel-item active">
                                        <img width='720' height='348' src={ban1} class="d-block w-100" alt="..."/>
                                        </div>
                                        <div class="carousel-item">
                                        <img width='720' height='348' src={ban2} class="d-block w-100" alt="..."/>
                                        </div>
                                        <div class="carousel-item">
                                        <img  width='720' height='348' src={ban3} class="d-block w-100" alt="..."/>
                                        </div>
                                    </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>

                             {/* Carousal ky nechy ka */}

                             <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='col-lg-3 '>
                                        <img className='bannerBottomImage' style={{padding: '10px'}} src={clot1} width='190' height='150' />
                                    </div>
                                    <div className='col-lg-3 '>
                                         <img className='bannerBottomImage' style={{padding: '15px'}} src={clot2} width='190' height='150' />
                                    </div>
                                    <div className='col-lg-3 '>
                                         <img className='bannerBottomImage' style={{padding: '15px'}} src={clot3} width='190' height='150' />
                                    </div>
                                    <div className='col-lg-3 '>
                                        <img className='bannerBottomImage' style={{padding: '15px'}} src={clot4} width='190' height='150' />
                                    </div>
                                </div>
                             </div>
                       </div>

                       <div className='col-lg-1 bannerRight' style={{paddingLeft: '0px'}}>
                                <img src={ali4} width='230' height='490'/>
                       </div>

                   </div>

               </div>

               {/* Home Second Section After Banner*/}

               
                    <div className=' row BestMatchHeading'>
                        <h2>Best Match</h2>
                    </div>

                {/* Products Image Showing From following */}

                <HomeProductDisplay/>

                {/* Home Footer */}

                <HomeFooter />
                
            </div>
        )
    }
}

export default connect(
    null,
    {getProducts}
)(Home)