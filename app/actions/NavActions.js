import alt from '../alt';

class NavActions {
    constructor() {
        this.generateActions(
            'searchTextUpdate',
        );
    }
}

export default alt.createActions(NavActions);