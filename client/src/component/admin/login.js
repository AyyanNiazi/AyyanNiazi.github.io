import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import './style/login.css'
import { connect } from 'react-redux';
import {loginUser} from '../../store/actions/authActions'

let log = console.log
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            userType: 'admin',
            isLogin: false,
          }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        const {email,password,userType} = this.state;

        let adminLogin = {
            email,
            password,
            userType
        }
        this.props.loginUser(adminLogin)
        
        log(adminLogin)

    }
    componentWillReceiveProps(nextProps){
        log(nextProps)
        if(nextProps){
            log(nextProps)
            if(nextProps.userType===true && nextProps.isLogin===true){
                this.setState({
                    isLogin: true
                })
            }
        }
    }
         
    render() { 
        if(this.state.isLogin===true){
            return (
                <Redirect to='/adminDashboard' />

            )
        }
       
        return ( 
            <div>
                <div className='bg' >
                    <div className='form' >
                        <form>
                            <h1>Login</h1>
                            <hr style={{border: '3px solid #ffffff',marginBottom: '50px'}} />

                            <input type='text' placeholder='Username'
                             onChange={this.onChange}
                             value={this.state.email}
                             name='email'
                             type="email" 
                             id="email" 
                             aria-describedby="emailHelp" />

                            <input type='text' placeholder='Paswword' 
                             onChange={this.onChange}
                             value={this.state.password}
                             name='email'
                             type="email" 
                             id="password" 
                             aria-describedby="emailHelp"/>

                            <button type='button' onClick={this.onSubmit.bind(this)} >Log In</button>

                            <p>Forgoet Password</p>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}

// redux
const mapStateToProps = state => {
    console.log(state)
    return {
        isLogin: state.auth.isAuthenticated===true,
        userType: state.auth.user.userType==='admin'
    }
}
export default connect(
    mapStateToProps,
    {loginUser}
)(AdminLogin);