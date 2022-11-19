import { createSlice } from '@reduxjs/toolkit';
import { CART_LIMIT } from './cart.slice';

const initialState = {
    ordersState: {
        data: [],
        loading: false,
        error: null,
        // Thông tin phân trang
        pagination: {
            // Trang hiện tại
            page: 1,
            // Số record trả về trong 1 trang
            limit: CART_LIMIT,
            // Tổng số record từ server
            total: null,
            // Tổng số trang
            totalPage: null,
        },
    },
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getListOrdersAction: (state, action) => {
            state.ordersState = {
                ...state.ordersState,
                loading: true,
            };
        },
        getListOrdersActionSuccess: (state, action) => {
            const { data, totalProduct } = action.payload;
            state.ordersState = {
                ...state.ordersState,
                data,
                loading: false,
                pagination: {
                    ...state.ordersState.pagination,
                    total: +totalProduct,
                    totalPage: totalProduct / CART_LIMIT,
                },
            };
        },
        getListOrdersActionFailed: (state, action) => {

        },

        addOrdersAction: (state, action) => {
            state.ordersState = {
                ...state.ordersState,
                loading: true,
            };
        },
        addOrdersSuccess: (state, action) => {
            state.ordersState = {
                ...state.ordersState,
                loading: false,
            };
        },
        addOrdersFailed: (state, action) => {

        }
    },
})

// Action creators are generated for each case reducer function
export const {
    getListOrdersAction,
    getListOrdersActionSuccess,
    getListOrdersActionFailed,
    addOrdersAction,
    addOrdersSuccess,
    addOrdersFailed
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;