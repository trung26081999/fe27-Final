import { OrdersAPI } from "api";
import { delay, put, takeEvery } from "redux-saga/effects";
import {
    addOrdersAction,
    addOrdersFailed,
    addOrdersSuccess,
    getListOrdersAction,
    getListOrdersActionFailed,
    getListOrdersActionSuccess
} from "stores/slices/orders.slice";

function* getListOrders(action) {
    try {
        yield delay(200);
        const response = yield OrdersAPI.fetchOrders(action.payload);
        const productData = response.data;
        const totalProduct = response.data.length;
        // Put 1 action đã được định nghĩa ở slice
        yield put(
            getListOrdersActionSuccess({
                data: productData,
                totalProduct: totalProduct,
            })
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(getListOrdersActionFailed(e.response.data));
    }
}

function* addOrders(action) {
    try {
        const response = yield OrdersAPI.addOrders(action.payload);
        // Put 1 action đã được định nghĩa ở slice
        yield put(addOrdersSuccess(response.data));
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        console.log("e:", e);
        yield put(addOrdersFailed(e.response.data));
    }
}

export function* ordersSaga() {
    yield takeEvery(getListOrdersAction, getListOrders);
    yield takeEvery(addOrdersAction, addOrders);
}