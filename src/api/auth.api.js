import { PRODUCT_LIMIT } from "stores/slices/product.slice";
import { API, URL_API } from "./const.api";


export const AuthAPI = {
    login: (data) => API.post(`${URL_API}/api/auth/login`, data),
    register: (data) => API.post(`${URL_API}/api/auth/users`, data),
    fetchUserRegister: (page) => {
        const queryParam = page ? `?_page=${page}&_limit=${PRODUCT_LIMIT}` : '';
    
        return API.get(`${URL_API}/api/users${queryParam}`);
      },
}