import { PRODUCT_LIMIT } from "stores/slices/product.slice";
import { API, URL_API } from "./const.api";


export const ProductAPI = {
  fetchProduct: (page) => {
    const queryParam = page ? `?_page=${page}&_limit=${PRODUCT_LIMIT}` : '';

    return API.get(`${URL_API}/api/products${queryParam}`);
  },
  searchProduct: (textSearch) => {
    const queryParam = `?q=${textSearch}`;

    return API.get(`${URL_API}/api/products${queryParam}`);
  },
  deleteProduct: (id) => {
    return API.delete(`${URL_API}/api/products`, id);
  },
  addProduct: (data) => {
    return API.post(`${URL_API}/api/products`, data);
  },
  editProduct: (id, data) => {
    return API.patch(`${URL_API}/api/products`, id, data);
  }
};