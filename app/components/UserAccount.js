import React from 'react';
import {Link} from 'react-router';
import * as firebase from "firebase";

class UserAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: "Login",
        }
        this.hintText = "New User? Register Here."
        this.switchForm = this.switchForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passChange = this.passChange.bind(this);
        //this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //this.props.router.push('/');
            } else {
                // No user is signed in.
            }
        });
    }

    componentWillUnmount() {
        //NavStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    registerUser(event) {
        event.preventDefault();
        const email = this.state.email;
        const pass = this.state.password;
        var signin = function (email, pass) {
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                if(error.code || error.message);
                console.log(error.message);
                // ...
            });
        }
        if(this.state.login === 'Login') {
            signin(email, pass);
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                if(error.code || error.message)
                    console.log(error.message);
                else {
                    signin(email, pass);
                }
                // ...
            });
        }
        console.log(this.state.email);
    }


    emailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    passChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    switchForm(event) {
        if(this.state.login === "Login") {
            this.state.login = "Sign Up";
            this.hintText = "Existing User? Login Here.";
        }
        else {
            this.state.login = "Login";
            this.hintText = "New User? Register Here.";
        }
        this.forceUpdate();
    }

    render() {
        return (
            <div className="account">
                <div className="login-form-logo">
                    <Link to="/"> <img src='/img/logo.svg' alt="Logo"/> </Link>
                </div>
                <div className="login-form-fields">
                    <form onSubmit={this.registerUser}>
                        <input type="text" className="email-field" value={this.state.email} placeholder="Email Address" onChange={this.emailChange}/>
                        <input type="password" className="password-field" value={this.state.password} placeholder="Password" onChange={this.passChange}/>
                        <input type="submit" className="login-button" value={this.state.login}/>
                        <div onClick={this.switchForm}> {this.hintText} </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserAccount;
