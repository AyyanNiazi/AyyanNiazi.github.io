import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './style/footer.css'

class Footer extends Component{
    render(){
        return (
           <div>
               <div className='row' style={{backgroundColor: '#E8E8E8', padding: '20px'}} >
                    <div className='myCont'>
                        <div className='col-lg-12'>
                            <div className='col-lg-6' >
                                <h3>Help</h3>
                                <p>Customer Service, Disputes & Reports, Buyer Protection, Report IPR infringement</p>
                                <br/><br/>
                                <h3>Browse Category</h3>
                                <p>Customer Service, Disputes & Reports, Buyer Protection, Report IPR infringement</p>
                                <button type="button" class="btn btn-success andApp">Google Play</button>
                                <button type="button" class="btn btn-secondary iosApp">App Store</button>

                            </div>
                            <div className='col-lg-6' >
                                <h3>Ali express Multi Language Site</h3>
                                <p>Russian, Portuguese, Spanish, French, German, Italian, Dutch, Turkish, Japanese, Korean, Thai, Vietnamese, Arabic, Hebrew, Polish</p>
                                    <br/>
                                <h3>Help</h3>
                                <p>Customer Service, Disputes & Reports, Buyer Protection, Report IPR infringement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer