import { CART_LIMIT } from "stores/slices/cart.slice";
import { API, URL_API } from "./const.api";

export const CartAPI = {
  fetchCart: (page) => {
    const queryParam = page ? `?_page=${page}&_limit=${CART_LIMIT}` : '';

    return API.get(`${URL_API}/api/carts${queryParam}`);
  },
  searchCart: (textSearch) => {
    const queryParam = `?q=${textSearch}`;

    return API.get(`${URL_API}/api/carts${queryParam}`);
  },
  deleteCart: (id) => {
    return API.delete(`${URL_API}/api/carts`, id);
  },
  addCart: (data) => {
    return API.post(`${URL_API}/api/carts`, data);
  },
  editCart: (id, data) => {
    return API.patch(`${URL_API}/api/carts`, id, data);
  }
};