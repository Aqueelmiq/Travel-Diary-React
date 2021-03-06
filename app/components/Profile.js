import React from 'react';
import * as firebase from 'firebase';
//import {Link} from 'react-router';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                following: ["dummy"],
                followers: ["dummy"],
                liked: [],
                name: '',
                uid: '',
            },
            searchText: '',
            searchResult: {},
        }
        this.searchState = false;
        this.onChange = this.onChange.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
        this.searchUpdate = this.searchUpdate.bind(this);
        this.backToSearch = this.backToSearch.bind(this);
        this.follow = this.follow.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user.uid);
                firebase.database().ref('users/' + user.uid).once('value')
                    .then(function(snapshot) {
                        if (snapshot.val()) {
                            console.log(snapshot.val().name);
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
        var found = false;
        event.preventDefault();
        this.searchState = true;
        firebase.database().ref('users').orderByChild('name').equalTo(this.state.searchText).on('child_added', function (snapshot) {
            if (snapshot.val()) {
                found = true;
                this.setState({
                    searchResult: snapshot.val(),
                });
            }
        }.bind(this));
        if(!found)
            this.setState({searchResult: "No User Found",});
    }

    follow(event) {
        event.preventDefault();
        var uid = firebase.auth().currentUser.uid;
        var fid = this.state.searchResult.uid;
        if(fid == uid)
            console.log("Cannot follow same user");
        else {
            this.state.user.following.push({
                uid: this.state.searchResult.uid,
                name: this.state.searchResult.name,
            });
            this.state.searchResult.followers.push({
                uid: this.state.user.uid,
                name: this.state.user.name,
            });
            firebase.database().ref('users/' + uid).set(this.state.user);
            firebase.database().ref('users/' + fid).set(this.state.searchResult);
        }
    }

    backToSearch(event) {
        event.preventDefault();
        this.searchState = false;
        this.setState({
            searchResult: {},
        });
    }

    render() {

        const searchArea = () => {
            if(this.searchState) {
                if(this.state.searchResult === "No User Found") {
                    return(
                        <div className="search-result box-medium">
                            <h3> {this.state.searchResult} </h3>
                            <button className="search-button" onClick={this.backToSearch}> Back </button>
                        </div>
                    );
                }
                else {
                    return(
                        <div className="search-result box-medium">
                            <h3> {this.state.searchResult.name} </h3>
                            <button className="search-button" onClick={this.follow}> Follow </button>
                            <button className="search-button space-10" onClick={this.backToSearch}> Back </button>
                        </div>
                    );
                }
            }
            else {
                return(
                    <div className="add-follower">
                        <h3> Search User </h3>
                        <input type="text" value={this.state.searchText} onChange={this.searchUpdate} placeholder="Type a name" className="follower-name-input"/>
                        <button className="search-button" onClick={this.handleNewItem}> Search </button>
                    </div>
                );
            }
        }

        const followers = this.state.user.followers.map((user, index) => {
            if(user.name) {
                return (
                    <div key={index}>
                        <p> {user.name} </p>
                    </div>
                );
            }
        });

        const following = this.state.user.following.map((user, index) => {
            if(user.name) {
                return (
                    <div key={index}>
                        <p> {user.name} </p>
                    </div>
                );
            }
        });

        return (
            <div>
                <div className="medium-align profile-details">
                    <img src="/img/profile-pic.png"/>
                    <h3> {this.state.user.name} </h3>
                    <p> <br/></p>
                </div>
                {searchArea()}
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
                        <div> <h4> Followers </h4> </div>
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