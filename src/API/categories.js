import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllCategories = () =>
    axios.get(`${BASE_URL}category/all`)

export const createCategory = data =>
    axios.post(`${BASE_URL}category/create`, data);

export const deleteCategory = categoryId =>
    axios.delete(`${BASE_URL}category/${categoryId}`);

export const updateCategory = data =>
    axios.put(`${BASE_URL}category/update`, data);

export const getCategoryList = categoryId =>
    axios.get(`${BASE_URL}category/categoryList/${categoryId}`)