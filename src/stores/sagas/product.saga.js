import { put, takeEvery, delay } from "redux-saga/effects";
import {
  addProductAction,
  addProductActionFailed,
  addProductActionSuccess,
  deleteProductAction,
  deleteProductActionFailed,
  deleteProductActionSuccess,
  fetchProductAction,
  fetchProductActionFailed,
  fetchProductActionSuccess,
  searchProductAction,
  searchProductActionFailed,
  searchProductActionSuccess,
} from "stores/slices/product.slice.js";
import { ProductAPI } from "api/product.api.js";

function* fetchProduct(action) {
  try {
    yield delay(1000);
    const response = yield ProductAPI.fetchProduct(action.payload);
    const productData = response.data;
    const totalProduct = response.headers["x-total-count"];

    // Put 1 action đã được định nghĩa ở slice
    yield put(
      fetchProductActionSuccess({
        data: productData,
        totalProduct: totalProduct,
      })
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    yield put(fetchProductActionFailed(e.response.data));
  }
}

function* searchProduct(action) {
  try {
    yield delay(1000);
    const response = yield ProductAPI.searchProduct(action.payload);
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      searchProductActionSuccess(response.data)
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    yield put(searchProductActionFailed(e.response.data));
  }
}

function* addProduct(action) {
  try {
    // console.log("data:", action.payload);
    // const addPayload = action.payload;
    const response = yield ProductAPI.addProduct(action.payload);
    // {
    //   name: addPayload.name,
    //   price: addPayload.price,
    //   img: addPayload.img,
    //   category: addPayload.category,
    //   feature: addPayload.feature,
    //   size: addPayload.size,
    //   quantity: addPayload.quantity,
    // }
    console.log("product:", response);
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      addProductActionSuccess(response.data)
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    yield put(addProductActionFailed(e.response.data));
  }
}

function* deleteProduct(action) {
  try {
    const response = yield ProductAPI.deleteProduct(action.payload);
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      deleteProductActionSuccess(response.data)
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    console.log(e);
    yield put(deleteProductActionFailed(e.response.data));
  }
}

export function* productSaga() {
  yield takeEvery(fetchProductAction, fetchProduct);
  yield takeEvery(searchProductAction, searchProduct);
  yield takeEvery(addProductAction, addProduct);
  yield takeEvery(deleteProductAction, deleteProduct);
}
