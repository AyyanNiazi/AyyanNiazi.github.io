import React,{Component} from 'react';
import './style/userNav.css'
import { Link } from 'react-router-dom';

class UserNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
                <div className='row'  id='mainNav' >
                  <ul id='userNav' >
                      <li> <Link to='/user/landingPage'>  My Dashboard </Link></li>
                      <li> <Link to='/user/orders' > My Orders </Link> </li>
                      <li><Link> My Messages </Link></li>
                      <li><Link>My Wish List</Link></li>
                      <li><Link>My Favourite Stores</Link></li>
                      <li><Link to='/user/setting' >Account Setting</Link></li>
                  </ul>
                </div>
            </>
         );
    }
}
 
export default UserNavbar;