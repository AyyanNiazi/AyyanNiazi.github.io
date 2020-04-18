import React,{Component} from 'react';
import './style/storeApprovals.css'
import { connect } from 'react-redux';
import axios from 'axios';
import {updateStatus} from '../../../store/actions/adminAction'
// import {loginUser} from '../../store/actions/authActions'

let log = console.log
let store = [];
let products = [];
// let arr = []
class ProductApprovals extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          storeStatus: [],
          products: undefined,
          store: [],
          statusLoader: true,
          delId: ''

         }
        }
onChange= (index,e) => {
    let array = this.state.storeStatus;
    array[index] = e.target.value            
    
    this.setState({
        storeStatus: array
    })
}
        componentDidMount() {
            axios.get('/api/admin/getStore')   
            .then(res => {
                log(res.data)

                res.data.forEach(element => {
                      store.push(element.storeInfo)
                });
                log(store)
                if(res.data){
                 
                 let filtered = res.data.filter(e => {
                     return e.storeStatus === 'pending'
                 })

                 log(filtered)
                    this.setState({
                        store: filtered,
                        isStatus:res.data
                    })
                }

            })         
            .catch(err => {
                log(err);
            })
        }
         
        onSubmit = (id,e) => {
            e.preventDefault()

            
            this.setState({
                statusLoader:false,
                delId: id,
            })
            const {storeStatus} = this.state
            
            let changeStatus = {
                storeStatus:storeStatus[storeStatus.length-1],
                storeId: id
            }
            this.props.updateStatus(changeStatus);
        log(changeStatus);


        }
        componentWillReceiveProps(nextProps){
            if(nextProps.status===true){

                let filtered = this.state.store.filter(e => {
                    return e._id !== this.state.delId
                })
                log(filtered)
                this.setState({
                    statusLoader: true,
                    store: filtered
                })
            }
        }

    render() { 
        log(this.state)
        return ( 
            <div>
             

                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Store Name</th>
                            <th scope="col">Ntn No</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              !this.state.store ? (<p>Loading ..........</p>) :  this.state.store.map((item,index) => {
                                return (
                                    <tr>
                                    <th scope="row" style={{color: '#FF4747'}} > {item.storeInfo[0].name}  </th>
                                    <td> {item.storeInfo[0].ntn} </td>
                                    <td  > 
                                        <select value={this.state.storeStatus[index]}  onChange={this.onChange.bind(this,index)} name='storeStatus' style={{textDecoration: 'none',border: '1px solid white',cursor: 'pointer',WebkitAppearance: 'none',fontSize: '16px'}} >
                                            <option value={item.storeStatus} style={{fontSize: '16px',padding: '20px'}}> {item.storeStatus} </option>
                                            <option value='approved' > Approved </option>
                                            <option value='rejected' > Rejected </option>
                                        </select>
                                        {/* <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {item.storeStatus}
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <span class="dropdown-item"  style={{ padding: '8px',textAlign: 'center', backgroundColor: 'limegreen',margin: '1px' }}> {item.storeStatus} </span>
                                                <span class="dropdown-item" style={{ padding: '8px',textAlign: 'center', backgroundColor: 'limegreen',margin: '1px' }}> Approved </span>
                                                <span class="dropdown-item" style={{ padding: '8px',textAlign: 'center', backgroundColor: 'red',margin: '1px',cursor: 'pointer' }}> Reject </span>
                                              
                                            </div>
                                        </div>     */}
                                    </td>
                                    <td> {item.storeInfo[0].companyName} </td>
                                    <td> {item.date} </td>
                                    <td   ><span onClick={this.onSubmit.bind(this,item._id)} className={this.state.statusLoader===true? 'updated' : 'pending'}  > Change Status  </span></td>
                                    </tr>
                                  
                                ) 
                              })
                          }                           
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

// redux
const mapStateToProps = state => {
    console.log(state)
    return {
        status: state.admin.status
        
    }
}
export default connect(
 mapStateToProps,{updateStatus}
)(ProductApprovals);