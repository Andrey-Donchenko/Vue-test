import Vue from 'vue'
import Vuex from "vuex"

import actions from "./actions/"
import mutations from "./mutations/";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        treeData: { //tree of categories
            id: "0",
            name: "",
            root: true,
            toggled: true,
            children: []
        },
        categoryData: {}, //data for create/update category
        categoryList: [], //data for breadcrumbs
        recipesList: [], //list of recipes for current category
        articlesList: [], //list of articles for current category
        recipe: {}, //current recipe data
        article: {}, //current article data
        itemData: null, //data for create/update recipe/article
        showModal: false //current state of create/update category modal
    },
    getters: {
        currentCategory: state => {
            if (state.categoryList.length) {
                return state.categoryList[state.categoryList.length - 1];
            } else {
                return null;
            }
        }
    },
    mutations,
    actions
})