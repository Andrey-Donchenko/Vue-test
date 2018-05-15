import axios from "axios";
import { BASE_URL } from "../constants";

export const createArticle = data =>
    axios.post(`${BASE_URL}article/create`, data);

export const deleteArticle = id =>
    axios.delete(`${BASE_URL}article/${id}`);

export const updateArticle = data =>
    axios.put(`${BASE_URL}article/update`, data);

export const getArticleCategoryList = articleId =>
    axios.get(`${BASE_URL}article/categoryList/${articleId}`)

export const getArticleByCategory = categoryId =>
    axios.get(`${BASE_URL}article/byCategory/${categoryId}`)

export const getArticle = articleId =>
    axios.get(`${BASE_URL}article/item/${articleId}`)