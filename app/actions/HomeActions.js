import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'newItemTextUpdate',
        );
    }
}

export default alt.createActions(HomeActions);