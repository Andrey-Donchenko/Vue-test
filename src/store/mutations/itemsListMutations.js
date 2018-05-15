export default {

    setItemsListData(state, payload) {
        switch (payload.name) {
            case 'recipes':
                state.recipesList = payload.data;
                break;
            case 'articles':
                state.articlesList = payload.data;
                break;
            default:
                break;
        };
    }
}