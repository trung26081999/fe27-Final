import { CART_LIMIT } from "stores/slices/cart.slice";
import { API, URL_API } from "./const.api";

export const OrdersAPI = {
  fetchOrders: (page) => {
    const queryParam = page ? `?_page=${page}&_limit=${CART_LIMIT}` : '';

    return API.get(`${URL_API}/api/orders${queryParam}`);
  },
  addOrders: (data) => {
    return API.post(`${URL_API}/api/orders`, data);
  },
  editOrders: (id, data) => {
    return API.patch(`${URL_API}/api/orders`, id, data);
  }
};