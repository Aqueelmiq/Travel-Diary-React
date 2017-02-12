import alt from '../alt';
import * as firebase from 'firebase';

class AppActions {
    constructor() {
        this.generateActions(
            'postLike',
            'postUnLike',
            'addNewPost',
            'retrievePosts',
        );
    }

    getPosts() {
        $.ajax({ url: '/api/posts' })
            .done(data => {
                this.actions.retrievePosts(data.posts);
            })
            .fail(jqXhr => {
                //this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
            });
    }

    newPost(title, author, location, img, text, file, id) {
        var this_post = {img: "xy.jpg"};
        const db = firebase.storage();
        const imagesRef = db.ref().child('posts').child('images');

        $.ajax({
            type: 'POST',
            url: '/api/posts',
            data: {
                title: title,
                text: text,
                img: img,
                likes: 0,
                author: author,
                location: location,
                id: id }
        })
            .done((data) => {
                this_post = data.uploaded;
                const postImageRef = imagesRef.child(data.uploaded._id + '.jpg');
                postImageRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    postImageRef.getDownloadURL().then(function(url) {
                        $.ajax({
                            type: 'PUT',
                            url: '/api/posts/img/' + this_post._id,
                            data: {
                                img: url,
                            }
                        })
                            .done((data) => {
                                $.ajax({ url: '/api/posts' })
                                    .done((data) => {
                                        this.actions.addNewPost(data.posts);
                                    })
                                console.log(data);
                            })
                            .fail((jqXhr) => {
                                //this.actions.addCharacterFail(jqXhr.responseJSON.message);
                            });
                    }.bind(this))
                }.bind(this));
            })
            .fail((jqXhr) => {
                //this.actions.addCharacterFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(AppActions);