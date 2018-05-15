import Vue from 'vue'
import VueRouter from 'vue-router'

import ContentComponent from "./components/ContentComponent"
import ItemsList from './components/ItemsList'
import CreateUpdateItem from './components/CreateUpdateItem'
import ItemInfo from './components/ItemInfo'
import { getCategoryList } from "./API/categories";
import { getRecipe, getRecipeCategoryList } from "./API/recipes";
import { getArticle, getArticleCategoryList } from "./API/articles";

Vue.use(VueRouter);

const routes = [
    {
        name: 'category',
        path: '/category/:id',
        redirect: { name: 'recipes' },
        component: ContentComponent,
        beforeEnter: checkToExist,
        children: [
            {
                name: 'recipes',
                path: 'recipes',
                component: ItemsList
            },
            {
                name: 'articles',
                path: 'articles',
                component: ItemsList
            }
        ]
    },
    {
        name: 'createItem',
        path: '/create',
        component: CreateUpdateItem,
        beforeEnter: checkToResolve
    },
    {
        name: 'updateItem',
        path: '/update/:id',
        component: CreateUpdateItem,
        beforeEnter: checkToResolve
    },
    {
        name: 'recipe',
        path: '/recipe/:id',
        component: ItemInfo,
        beforeEnter: checkToExist
    },
    {
        name: 'article',
        path: '/article/:id',
        component: ItemInfo,
        beforeEnter: checkToExist
    }
]

function checkToResolve(to, from, next) {
    if (!from.name) {
        next('/');
    }
    else {
        next();
    }
}

function checkToExist(to, from, next) {
    if (!from.name) {
        switch (to.name) {
            case 'recipes':
            case 'articles':
                getCategoryList(to.params.id)
                    .then(res => {
                        let isDeleted = res.data.some(el => {
                            return el.isDeleted
                        });
                        isDeleted ? next('/') : next();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'recipe':
                getRecipe(to.params.id)
                    .then(res => {
                        if (res.data.isDeleted) {
                            next('/');
                        } else {
                            getRecipeCategoryList(res.data._id)
                                .then(res => {
                                    let isDeleted = res.data.some(el => {
                                        return el.isDeleted
                                    });
                                    isDeleted ? next('/') : next();
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'article':
                getArticle(to.params.id)
                    .then(res => {
                        if (res.data.isDeleted) {
                            next('/');
                        } else {
                            getArticleCategoryList(res.data._id)
                                .then(res => {
                                    let isDeleted = res.data.some(el => {
                                        return el.isDeleted
                                    });
                                    isDeleted ? next('/') : next();
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            default:
                break;
        };
    } else {
        next();
    }
}

export default new VueRouter({
    mode: 'history',
    routes
})