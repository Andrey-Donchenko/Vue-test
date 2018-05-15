import { getRecipe } from "../../API/recipes";
import { getArticle } from "../../API/articles";

export default {

    getItem(context, payload) {
        switch (payload.name) {
            case 'recipe':
                getRecipe(payload.id)
                    .then(res => {
                        context.commit('setItemData', {
                            data: res.data,
                            name: payload.name
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'article':
                getArticle(payload.id)
                    .then(res => {
                        context.commit('setItemData', {
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