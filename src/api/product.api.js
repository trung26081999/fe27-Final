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
  };