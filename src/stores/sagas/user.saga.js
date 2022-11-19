import {
    delay,
    put,
    takeEvery
} from 'redux-saga/effects';
import { AuthAPI } from '../../api';
import {
    fetchUserRegisterAction, fetchUserRegisterActionFailed, fetchUserRegisterActionSuccess, loginAction,
    loginActionFailed,
    loginActionSuccess,
    // logoutAction, 
    // logoutActionFailed, 
    // logoutActionSuccess, 
    registerAction,
    registerActionFailed,
    registerActionSuccess
} from '../slices/user.slice.js';

function* login(action) {
    try {
        // console.log("payload",action.payload);
        const loginPayload = action.payload;
        const response = yield AuthAPI.login({
            email: loginPayload.email,
            password: loginPayload.password,
        });
        const token = response.data.accessToken;
        const user = response.data.user;
        // console.log("response",token,user);
        yield put(loginActionSuccess({token, user}));
        // console.log("token",response.data.accessToken);
    } catch (e) {
        yield put(loginActionFailed(e.response.data));
    }
}

function* register(action) {
    try {
        const registerPayload = action.payload;

        const response = yield AuthAPI.register({
            email: registerPayload.email,
            password: registerPayload.password,
            address: registerPayload.address,
            phone: registerPayload.phone,
            lastName: registerPayload.lastName,
            firstName: registerPayload.firstName,
            date: registerPayload.date,
            gender: registerPayload.gender,
        });
        yield put(registerActionSuccess(response.data.user));
    } catch (e) {
        console.log("error", e);
        yield put(registerActionFailed(e.response.data));
    }
}

function* fetchUserRegister(action) {
    try {
        yield delay(1000);
        const response = yield AuthAPI.fetchUserRegister(action.payload);
        const productData = response.data;
        const totalProduct = response.headers["x-total-count"];

        // Put 1 action đã được định nghĩa ở slice
        yield put(
            fetchUserRegisterActionSuccess({
                data: productData,
                totalProduct: totalProduct,
            })
        );
    } catch (e) {
        // Put 1 action đã được định nghĩa ở slice
        yield put(fetchUserRegisterActionFailed(e.response.data));
    }
}
export function* userSaga() {
    yield takeEvery(loginAction, login);
    yield takeEvery(registerAction, register);
    yield takeEvery(fetchUserRegisterAction, fetchUserRegister);
}