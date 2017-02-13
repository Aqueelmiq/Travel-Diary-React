import React from 'react';
import CreatePostActions from '../actions/CreatePostActions';
import CreatePostStore from '../stores/CreatePostStore';
import Dropzone from 'react-dropzone';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = CreatePostStore.getState();
        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        CreatePostStore.listen(this.onChange);
        if(this.props.params.loc) {
            CreatePostActions.setLocation(this.props.params.loc);
        }
    }

    componentWillUnmount() {
        CreatePostStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    onDrop(files) {
        if(files.length > 0) {
            CreatePostActions.fileChange(files[0]);
        }
    }

    render() {
        let uploader;
        if(this.state.file == null) {
            uploader = () =>{
                return (
                    <div> Drop Image Here </div>
                );
            };
        }
        else {
            uploader = () => {
                return(
                    <img src={this.state.file.preview}/>
                );
            };
        }
        return (
            <div>
                <div className="create-post">
                    <form className="create-post-form">
                            <div className="fields">
                                <input className="post-form-title" type="text" value={this.state.title} onChange={CreatePostActions.titleChange} placeholder="Article Title"/>
                            </div>
                            <div className="fields">
                                <input className="post-form-location" type="text" value={this.state.location} onChange={CreatePostActions.locationChange} placeholder="Location"/>
                                <input className="post-form-author" type="text" value={this.state.author} onChange={CreatePostActions.authorChange} placeholder="Author Name"/>
                            </div>
                            <div className="fields">
                                <textarea className="post-form-desc" value={this.state.text} onChange={CreatePostActions.textChange} placeholder="Description"></textarea>
                            </div>
                            <div className="file-dropper">
                                <Dropzone className="file-box" accept={"image/*"} onDrop={this.onDrop}>
                                    {uploader}
                                </Dropzone>
                            </div>
                            <div className="fields">
                                <button className="post-button" onClick={function (event) {
                                    event.preventDefault();
                                    this.props.onPostSubmit(this.state.title, this.state.author, this.state.location, this.state.img, this.state.text, this.state.file, this.state.curr_id)
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
