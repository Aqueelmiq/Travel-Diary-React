import React from 'react';
import {Link} from 'react-router';
import * as firebase from "firebase";

class UserAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            login: "Login",
        }
        this.hintText = "New User? Register Here."
        this.switchForm = this.switchForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        //this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            var user_name = this.state.name;
            if (user) {
                //localStorage.setItem('uid', user.uid);
                firebase.database().ref('users/' + user.uid).once('value')
                    .then(function(snapshot) {
                        if(snapshot.val()) {
                            if(snapshot.val().name)
                                this.props.router.push('/feed');
                            else {
                                firebase.database().ref('users/' + user.uid + '/name').set(user_name)
                                    .then(function () {
                                        this.props.router.push('/feed');
                                    });
                            }
                        }
                        else {
                            firebase.database().ref('users/' + user.uid).set({
                                following: ["dummy"],
                                followers: ["dummy"],
                                name: user_name,
                                liked: ["dummy"],
                            }).then(function () {
                                this.props.router.push('/feed');
                            }.bind(this));
                        }
                    }.bind(this));
            } else {
                //localStorage.removeItem('uid');
            }
        }.bind(this));
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
        if(this.state.login === 'Login') {
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                if(error.code || error.message)
                    console.log(error.message);
                // ...
            });
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                if(error.code || error.message)
                    console.log(error.message);
                // ...
            });
        }
    }

    emailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    nameChange(event) {
        this.setState({
            name: event.target.value,
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
        const form = () => {
            if(this.state.login === "Login") {
                return(
                    <form onSubmit={this.registerUser}>
                        <input type="text" className="email-field" value={this.state.email} placeholder="Email Address" onChange={this.emailChange}/>
                        <input type="password" className="password-field" value={this.state.password} placeholder="Password" onChange={this.passChange}/>
                        <input type="submit" className="login-button" value={this.state.login}/>
                        <div onClick={this.switchForm}> {this.hintText} </div>
                    </form>
                );
            }
            else {
                return(
                    <form onSubmit={this.registerUser}>
                        <input type="text" className="name-field" value={this.state.name} placeholder="Name" onChange={this.nameChange}/>
                        <input type="text" className="email-field" value={this.state.email} placeholder="Email Address" onChange={this.emailChange}/>
                        <input type="password" className="password-field" value={this.state.password} placeholder="Password" onChange={this.passChange}/>
                        <input type="submit" className="login-button" value={this.state.login}/>
                        <div onClick={this.switchForm}> {this.hintText} </div>
                    </form>
                );
            }

        }

        return (
            <div className="account">
                <div className="login-form-logo">
                    <Link to="/"> <img src='/img/logo.svg' alt="Logo"/> </Link>
                </div>
                <div className="login-form-fields">
                    {form()}
                </div>
            </div>
        );
    }
}

export default UserAccount;
