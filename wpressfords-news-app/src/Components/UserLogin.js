import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUserIn } from '../actions';
import './UserLogin.css';

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

class UserLogin extends Component {
  
    constructor(props) {
        super(props);
        this.state = {userName: ''};

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({userName: event.target.value});
    }

    handleLoginClick(isPublisher) {
        const user = {
            userName: this.state.userName,
            isPublisher: isPublisher
        }
        this.props.loginUserIn(user);
    }

    validEmail() {
        var re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return re.test(this.state.userName);
    }

    render() {
        const loggedIn = this.props.currentUser;
        
            if(loggedIn){
                return(
                    <div>
                        {this.props.children}
                    </div>
                )
            }else{
                const validEmail = this.validEmail();
                const buttonsClass = validEmail ? '' : 'inactive';
                return (
                    <div className="UserLogin">
                        <div>
                            <label>
                                Enter User Name:
                            </label>
                            <input type="email" placeholder="auser@wpressfords.com" value={this.state.title} onChange={this.handleUsernameChange} />
                        </div>
                        <div>
                            <button className={buttonsClass} onClick={() => this.handleLoginClick(false)} disabled={!validEmail}>Login as Employee</button>
                            <button className={buttonsClass} onClick={() => this.handleLoginClick(true)} disabled={!validEmail}>Login as Publisher</button>
                        </div>
                    </div>
                );
            }
           
 }
}

export default connect(mapStateToProps, { loginUserIn })(UserLogin);