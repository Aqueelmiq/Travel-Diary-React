import React from 'react';
import * as firebase from 'firebase';
//import {Link} from 'react-router';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                following: [],
                followers: [],
                liked: [],
                name: '',
            },
            searchText: '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.database().ref('users/' + user.uid).once('value')
                    .then(function(snapshot) {
                        if (snapshot.val()) {
                            this.setState({
                                user: snapshot.val()
                            })
                        }
                    }.bind(this));
            }
        }.bind(this));

    }

    componentWillUnmount() {
    }

    onChange(state) {
        this.setState(state);
    }

    searchUpdate(event) {
        this.setState({
            searchText: event.target.value,
        });
    }

    handleNewItem(event) {
        event.preventDefault();
        
    }

    render() {

        const followers = this.state.user.followers.map((user, index) => {
            return (
                <div key={index}>
                    <p> {user} </p>
                </div>
            );
        });

        const following = this.state.user.following.map((user, index) => {
            return (
                <div key={index}>
                    <p> {user} </p>
                </div>
            );
        });

        return (
            <div>
                <div className="add-follower">
                    <h3> Search User </h3>
                    <input type="text" value={this.state.searchText} onChange={this.searchUpdate} placeholder="Type a name" className="follower-name-input"/>
                    <button className="search-button" onClick={this.handleNewItem}> Search </button>
                </div>
                <div className="following box-medium">
                    <div className="box-medium-header">
                        <div> <h4> Following </h4> </div>
                        <div> {this.state.user.following.length + ' '} people following </div>
                    </div>
                    <div className="box-medium-body">
                        {following}
                    </div>
                </div>
                <div className="followers box-medium">
                    <div className="box-medium-header">
                        <div> <h4> Following </h4> </div>
                        <div> {this.state.user.followers.length + ' '} followers </div>
                    </div>
                    <div className="box-medium-body">
                        {followers}
                    </div>
                </div>

            </div>
        );
    }
}

export default Profile;