import axios from "axios";
import { BASE_URL } from "../constants";

export const createRecipe = data =>
    axios.post(`${BASE_URL}recipe/create`, data);

export const deleteRecipe = id =>
    axios.delete(`${BASE_URL}recipe/${id}`);

export const updateRecipe = data =>
    axios.put(`${BASE_URL}recipe/update`, data);

export const getRecipeCategoryList = recipeId =>
    axios.get(`${BASE_URL}recipe/categoryList/${recipeId}`)

export const getRecipeByCategory = categoryId =>
    axios.get(`${BASE_URL}recipe/byCategory/${categoryId}`)

export const getRecipe = recipeId =>
    axios.get(`${BASE_URL}recipe/item/${recipeId}`)