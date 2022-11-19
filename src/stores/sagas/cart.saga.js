import { CartAPI } from "api";
import { delay, put, takeEvery } from "redux-saga/effects";
import {
    addProductToCartAction,
    addProductToCartFailed,
    addProductToCartSuccess,
    deleteProductCartAction,
    deleteProductCartActionFailed,
    deleteProductCartActionSuccess,
    getListCartAction,
    getListCartActionFailed,
    getListCartActionSuccess,
    updateProductCartAction,
    updateProductCartActionFailed,
    updateProductCartActionSuccess
} from "stores/slices/cart.slice";

function* getListCart(action) {
    try {
        yield delay(200);
        const response = yield CartAPI.fetchCart(action.payload);
        const productData = response.data;
        const totalProduct = response.data.length;
        // Put 1 action đã được định nghĩa ở slice
        yield put(
            getListCartActionSuccess({
                data: productData,
                totalProduct: totalProduct,
            })
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(getListCartActionFailed(e.response.data));
    }
}

function* addProductToCart(action) {
    try {
        const response = yield CartAPI.addCart(action.payload);
        // Put 1 action đã được định nghĩa ở slice
        yield put(addProductToCartSuccess(response.data));
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        console.log("e:", e);
        yield put(addProductToCartFailed(e.response.data));
    }
}

function* deleteProductCart(action) {
    try {   
        const response = yield CartAPI.deleteCart(action.payload);
        // Put 1 action đã được định nghĩa ở slice
        yield put(
            deleteProductCartActionSuccess(response.data)
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(deleteProductCartActionFailed(e.response.data));
    }
}

function* updateProductCart(action) {
    try {
        const response = yield CartAPI.editCart(action.payload.id, action.payload.data);
        // Put 1 action đã được định nghĩa ở slice
        yield put(
            updateProductCartActionSuccess(response.data)
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        // console.log("error:", e);
        yield put(updateProductCartActionFailed(e.response.data));
    }
}
export function* cartSaga() {
    yield takeEvery(addProductToCartAction, addProductToCart);
    yield takeEvery(getListCartAction, getListCart);
    yield takeEvery(deleteProductCartAction, deleteProductCart);
    yield takeEvery(updateProductCartAction, updateProductCart);
}