import React from 'react';
import * as firebase from 'firebase';

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    breakLines(text) {
        var br = React.createElement('br');
        var regex = /(<br\/>)/g;
        return text.split(regex).map(function(line, index) {
            return line.match(regex) ? <br key={"key_" + index} /> : line;
        });
    };

    render() {
        return (
            <div className="post">
                <div className="post-contents">
                    <div className="post-header">
                        <div className="post-title">
                            {this.props.post.title}
                        </div>
                        <div className="post-loc">
                            {this.props.post.location}
                        </div>
                    </div>
                    <div className="post-body">
                        <img className="post-img" src={this.props.post.img}/>
                        <div className="post-text">
                            {this.breakLines(this.props.post.text)}
                        </div>
                    </div>
                </div>

                <div className="post-interactions">
                    <div className="post-love">
                        <img className="heart" src='/img/heart-outline.svg'/>
                        <p className="like-count">
                            {this.props.post.likes}
                        </p>
                    </div>
                    <div className="post-author">
                        {'by ' + this.props.post.author}
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
