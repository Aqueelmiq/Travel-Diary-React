import React from 'react';
//import {Link} from 'react-router';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.onChange = this.onChange.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChange(state) {
        this.setState(state);
    }

    handleNewItem(event) {
        event.preventDefault();
        this.props.router.push('/create');
    }

    render() {

        const followers = this.props.followers.map((user, index) => {
            return (
                <div key={index}>
                    <img src={user.img}/>
                    <p> {user.name} </p>
                </div>
            );
        });

        const following = this.props.following.map((user, index) => {
            return (
                <div key={index}>
                    <img src={user.img}/>
                    <p> {user.name} </p>
                </div>
            );
        });

        return (
            <div>
                <div className="add-follower">
                    <input type="text" placeholder="Type a name" className="follower-name-input"/>
                    <button onClick={this.handleNewItem}> Search </button>
                </div>
                <div className="following box-medium">
                    <div className="box-medium-header">
                        <div> Following </div>
                        <div> {this.props.following.count} </div>
                    </div>
                    <div className="box-medium-body">
                        {following}
                    </div>
                </div>
                <div className="followers box-medium">
                    <div className="box-medium-header">
                        <div> Following </div>
                        <div> {this.props.followers.count} </div>
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