import React from 'react';
import NavStore from '../stores/NavStore';
import NavActions from '../actions/NavActions';
import {Link} from 'react-router';
import * as firebase from 'firebase';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = NavStore.getState();
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        NavStore.listen(this.onChange);
    }

    componentWillUnmount() {
        NavStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    signOut(event) {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            console.log(error);
        });
    }

    onSearch(event) {
        event.preventDefault();
        this.props.router.push('search/'+this.state.searchText);
    }
    
    render() {
        return (
            <div className="Nav">
                <div className="logo">
                    <Link to="/"> <img src='/img/logo.svg' alt="Logo"/> </Link>
                </div>
                <div className="search">
                    <form onSubmit={this.onSearch}>
                        <input type="text" className="searchBar" value={this.state.searchText} placeholder="Search here" onChange={NavActions.searchTextUpdate}/>
                        <input type="submit" className="searchButton" value=""/>
                    </form>
                </div>
                <div className="actions">
                    <button id="nav-profile"> <Link to={'/profile'}> <img src='/img/profile.png'/> </Link></button>
                    <button id="nav-friends"> <img src='/img/friends.png'/> </button>
                    <button id="nav-alerts">  <img src='/img/notifications.png'/> </button>
                    <button id="nav-logout" onClick={this.signOut}>  <img src='/img/logout.svg'/> </button>
                </div>
            </div>
        );
    }
}

export default Nav;
