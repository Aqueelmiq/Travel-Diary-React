import alt from '../alt';
import * as firebase from 'firebase';

class SearchActions {
    constructor() {
        this.generateActions(
            'usersUpdate',
            'postsUpdate',
        );
    }

    loadResults(query) {
        console.log(query);
        $.ajax({ url: '/api/posts/search/' + query })
            .done(data => {
                this.actions.postsUpdate(data.posts);
                firebase.database().ref('users').orderByChild('name').equalTo(query).on('child_added', function (snapshot) {
                    if (snapshot.val()) {
                        this.actions.usersUpdate([snapshot.val()]);
                    }
                }.bind(this));
            })
            .fail(jqXhr => {
                //this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(SearchActions);