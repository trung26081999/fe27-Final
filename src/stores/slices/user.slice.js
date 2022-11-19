import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { toast } from 'react-toastify';
import { PRODUCT_LIMIT } from './product.slice';

const USER_INFO_KEY = 'USER_INFO';

const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_KEY)) : null;

const initialState = {
    userInfoState: {
        token: userInfoFromStorage,
        data: null,
        loading: false,
        error: null,
        pagination: {
            // Trang hiện tại
            page: 1,
            // Số record trả về trong 1 trang
            limit: PRODUCT_LIMIT,
            // Tổng số record từ server
            total: null,
            // Tổng số trang
            totalPage: null,
        },
    },
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loginAction(state, action) {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
            }
        },
        loginActionSuccess(state, action) {
            const {token, user} = action.payload;
            // console.log("userInfo",user);
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(token));
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                token: token,
                data: user,
            }
        },
        loginActionFailed(state, action) {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: toast.error(action.payload),
            }
        },
        registerAction(state, action) {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
            }
        },
        registerActionSuccess(state, action) {
            const userInfoResponse = { ...action.payload };
            // localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoResponse))
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: userInfoResponse,
            }
        },
        registerActionFailed(state, action) {
            // localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: toast.error(action.payload),
            }
        },

        fetchUserRegisterAction: (state, action) => {
            const page = action.payload;

            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
                pagination: {
                    ...state.userInfoState.pagination,
                    page,
                },
            };
        },
        fetchUserRegisterActionSuccess: (state, action) => {
            const { data, totalProduct } = action.payload;

            state.userInfoState = {
                ...state.userInfoState,
                data,
                loading: false,
                pagination: {
                    ...state.userInfoState.pagination,
                    total: +totalProduct,
                    totalPage: totalProduct / PRODUCT_LIMIT,
                },
            };
        },
        fetchUserRegisterActionFailed: (state, action) => {
            notification.error(action.payload);
        },

        logoutAction(state, action) {
            console.log('logout');
            localStorage.removeItem(USER_INFO_KEY);
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: null,
                token: null,
            }
        },
        // logoutActionSuccess(state, action) {
        // },
        // logoutActionFailed(state, action) {
        // },
    },
})

export const {
    loginAction, loginActionSuccess, loginActionFailed,
    registerAction, registerActionSuccess, registerActionFailed,
    logoutAction,
    fetchUserRegisterAction,
    fetchUserRegisterActionSuccess,
    fetchUserRegisterActionFailed,
} = userSlice.actions
export const userReducer = userSlice.reducer