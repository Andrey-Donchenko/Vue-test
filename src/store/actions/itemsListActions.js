import { getRecipeByCategory } from "../../API/recipes";
import { getArticleByCategory } from "../../API/articles";

export default {
   
    getItemsList(context, payload) {
        switch (payload.name) {
            case 'recipes':
                getRecipeByCategory(payload.id)
                    .then(res => {
                        context.commit('setItemsListData', {
                            data: res.data,
                            name: payload.name
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'articles':
                getArticleByCategory(payload.id)
                    .then(res => {
                        context.commit('setItemsListData', {
                            data: res.data,
                            name: payload.name
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            default:
                break;
        };
    }
}