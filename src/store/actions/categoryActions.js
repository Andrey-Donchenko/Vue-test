import { getAllCategories, getCategoryList } from "../../API/categories";
import { getRecipeCategoryList } from "../../API/recipes";
import { getArticleCategoryList } from "../../API/articles";

import { getTree } from "../../utils/getTree";

export default {

    getTreeData(context) {
        getAllCategories()
            .then(res => {
                let tree = getTree(null, res.data);
                context.commit('setTreeData', tree);
            })
            .catch(error => {
                console.log(error);
            });
    },
    getCategoryList(context, payload) {
        switch (payload.name) {
            case 'recipes':
            case 'articles':
                getCategoryList(payload.id)
                    .then(res => {
                        if (res.data.length) {
                            setActive(context, res.data);
                        }
                        context.commit('changeCategoryList', res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'recipe':
                getRecipeCategoryList(payload.id)
                    .then(res => {
                        if (res.data.length) {
                            setActive(context, res.data);
                        }
                        context.commit('changeCategoryList', res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'article':
                getArticleCategoryList(payload.id)
                    .then(res => {
                        if (res.data.length) {
                            setActive(context, res.data);
                        }
                        context.commit('changeCategoryList', res.data);
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

function setActive(context, arr) {
    getAllCategories()
        .then(res => {
            arr.forEach(el => {
                res.data.forEach(category => {
                    if (el._id === category._id) {
                        category.isActive = true;
                    }
                });
            });
            let categories = res.data;
            let tree = getTree(null, categories);
            context.commit('setTreeData', tree);
        })
        .catch(error => {
            console.log(error);
        });
}