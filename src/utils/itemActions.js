import { createRecipe, updateRecipe, deleteRecipe } from "../API/recipes";
import { createArticle, updateArticle, deleteArticle } from "../API/articles";

export const createItem = (check, data) => {
    if (check) {
        return createArticle(data);
    } else {
        return createRecipe(data);
    }
}

export const updateItem = (check, data) => {
    if (check) {
        return updateArticle(data);
    } else {
        return updateRecipe(data);
    }
}

export const deleteItem = (check, id) => {
    if (check) {
        return deleteArticle(id);
    } else {
        return deleteRecipe(id);
    }
}