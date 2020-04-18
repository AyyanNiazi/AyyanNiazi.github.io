import React,{Component} from 'react'
import {BrowserRouter,Routes,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {getProducts} from '../../store/actions/productsAction'
import MainNavbar from './mainNavbar'
import './style/navbar.css'

class Navbar extends Component{
    UNSAFE_componentWillMount(){
        this.props.getProducts('Navbar')
    }
    render(){
        return (
            <div>

            {/* top upper */}
                <div className='topUpper'>
            {/* first dropdown top upper ka */}
            <ul className='topul'>
                <li>
                <UncontrolledDropdown>
                    <DropdownToggle caret style={{backgroundColor: 'transparent' , color: 'black', zIndex: '100000'}} >
                        Sell on AliExpress
                    </DropdownToggle>
                    <DropdownMenu style={{backgroundColor: 'white', zIndex: '999999'}}>
                        <DropdownItem>Another Action</DropdownItem>
                        
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </li>
                <li>
                    <div>|</div>
                </li>
                <li>
                    <UncontrolledDropdown>
                        <DropdownToggle caret style={{backgroundColor: 'transparent' , color: 'black', zIndex: '100000'}} >
                                Help
                        </DropdownToggle >
                        <DropdownMenu style={{backgroundColor: 'white', zIndex: '999999'}}>
                            <DropdownItem>Another Action</DropdownItem>
                            
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </li>

                <li>
                    <p>Buyer Protection</p>
                </li>

                <li>
                    App
                </li>

                <li>
                    <div>|</div>
                </li>

                <li>
                    <p>Language| Currency</p>
                </li>

                <li>
                    <div>|</div>
                </li>

                <li>
                 
                    <p><i class="fa fa-heart-o" aria-hidden="true"></i>Wish List</p>
                </li>

                <li>
                    <UncontrolledDropdown style={{zIndex: '999999'}} >
                        <DropdownToggle caret style={{backgroundColor: 'transparent' , color: 'black', zIndex: '100000 !important'}} >
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu style={{backgroundColor: 'white', zIndex: '999999'}} >
                            <DropdownItem>Another Action</DropdownItem>
                            
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </li>
            </ul>
                    

                   
            {/* Second dropdown hel[p]  */}
                    

                </div>

                <MainNavbar />

            </div>
        )
    }
}

export default connect(
    null,
    {getProducts}
)(Navbar)