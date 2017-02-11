import alt from '../alt';

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

    newPost(title, author, location, img, text, id) {
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
                this.actions.addNewPost(data.posts);
            })
            .fail((jqXhr) => {
                //this.actions.addCharacterFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(AppActions);