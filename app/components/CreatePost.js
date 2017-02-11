import React from 'react';
import CreatePostActions from '../actions/CreatePostActions';
import CreatePostStore from '../stores/CreatePostStore';
import Post from './Post';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = CreatePostStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CreatePostStore.listen(this.onChange);
    }

    componentWillUnmount() {
        CreatePostStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        return (
            <div>
                <div className="create-post">
                    <form className="create-post-form">
                            <div>
                                <input className="post-form-title" type="text" value={this.state.title} onChange={CreatePostActions.titleChange} placeholder="Article Title"/>
                            </div>
                            <div>
                                <input className="post-form-location" type="text" value={this.state.location} onChange={CreatePostActions.locationChange} placeholder="Location"/>
                                <input className="post-form-author" type="text" value={this.state.author} onChange={CreatePostActions.authorChange} placeholder="Author Name"/>
                            </div>
                            <div>
                                <textarea className="post-form-desc" value={this.state.text} onChange={CreatePostActions.textChange} placeholder="Description"></textarea>
                            </div>
                            <div>
                                <input className="post-form-img" type="text" value={this.state.img} onChange={CreatePostActions.imgChange} placeholder="Image"/>
                            </div>
                            <div>
                                <button className="post-button" onClick={function (event) {
                                    event.preventDefault();
                                    this.props.onPostSubmit(this.state.title, this.state.author, this.state.location, this.state.img, this.state.text, this.state.curr_id)
                                    CreatePostActions.idIncrement();
                                }.bind(this)}> Post </button>
                            </div>
                    </form>
                </div>
            </div>
        );

    }
}

export default CreatePost;
