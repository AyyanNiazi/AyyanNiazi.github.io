import React, {Component} from 'react';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                  <div className='container' >
                    <div className='row' >
                        <div className='col-2'  style={{marginTop: '30px'}} >
                          SKU
                        </div>
                        <div className='col-10' >
                            <input type='text' style={{width: '30vw',height: '5vh', marginTop: '30px'}} />
                        </div>
                        <div className='col-2' style={{marginTop: '30px'}}>
                          Manage Stock? 
                        </div>
                        <div className='col-10' style={{marginTop: '30px'}}>
                            <input type='checkbox'  /> <span>Enable Stock management</span>
                        </div>
                        <div className='col-2' style={{marginTop: '30px'}}>
                          Stock Qty
                        </div>
                        <div className='col-10' >
                            <input type='text' style={{width: '30vw',height: '5vh', marginTop: '30px'}} />
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          Stock Status
                        </div>
                        <div className='col-10' >
                                <div class="input-group mb-3">
                                    <select style={{height:'5vh',marginTop: '10px',width: '30vw'}} class="custom-select" id="inputGroupSelect01">
                                        <option selected>In Stock...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          Allow Back orders
                        </div>
                        <div className='col-10' >
                               <div class="input-group mb-3">
                                    <select style={{height:'5vh',marginTop: '10px',width: '30vw'}} class="custom-select" id="inputGroupSelect01">
                                        <option selected>Do not allow...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Inventory;