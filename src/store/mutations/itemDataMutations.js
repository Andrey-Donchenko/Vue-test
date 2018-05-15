export default {

    setItemData(state, payload) {
        switch (payload.name) {
            case 'recipe':
                state.recipe = payload.data;
                break;
            case 'article':
                state.article = payload.data;
                break;
            default:
                break;
        };
    },

    clearItemData(state, name) {
        switch (name) {
            case 'recipe':
                state.recipe = {};
                break;
            case 'article':
                state.article = {};
                break;
            default:
                break;
        };
    },

    setUpdateData(state, data) {
        state.itemData = data;
    },

    clearUpdateData(state) {
        state.itemData = null;
    }
}