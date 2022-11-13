import * as types from '../ActionTypes/AdminActionTypes';
import {
    all,
    put,
    call,
    fork,
    takeEvery,
    takeLatest,
    delay
} from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { 
    adminChangePasswordApi, 
    adminLoginApi, 
    createAdminApi, 
    deleteAdminApi, 
    getSingleAdminApi, 
    loadAdminApi, 
    updateAdminApi 
} from '../APIs/AdminAPI';
import { 
    adminChangePasswordError, 
    adminChangePasswordSuccess, 
    adminLoginError, 
    adminLoginSuccess, 
    adminLogoutError, 
    adminLogoutStart, 
    adminLogoutSuccess, 
    createAdminError, 
    createAdminSuccess, 
    deleteAdminError, 
    deleteAdminSuccess, 
    getSingleAdminError, 
    getSingleAdminSuccess, 
    loadAdminError, 
    loadAdminSuccess, 
    updateAdminError, 
    updateAdminSuccess 
} from '../Actions/AdminActions';

const Toast = Swal.mixin({
    toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
})

export function* onAdminLoginStartAsync({ payload }) {
    try {
        const response = yield call(adminLoginApi, payload);
        console.log("PAYLOAD===", response)
        if (response.data.status === 200) {
            localStorage.setItem("ADMIN",response.data.data.token);
            yield put(adminLoginSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(adminLoginError(error.response)); 
    }
}

export function* onAdminChangePasswordStartAsync({payload}){
    try{
        const response = yield call(adminChangePasswordApi, payload);
        if(response.data.status === 200){
            yield put(adminChangePasswordSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error){
        yield put(adminChangePasswordError(error.response))
    }
}

export function* onAdminLogoutStartAsync(){
    try{
        localStorage.removeItem("ADMIN")
        const response = yield call(adminLogoutStart)
        console.log("payload", response)
        if(response.data.status === 200){
            yield put(adminLogoutSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch(error){
        yield put(adminLogoutError(error.response))
    }
}
export function* onLoadAdminStartAsync(){
    try{
        const response = yield call(loadAdminApi);
        if(response.data.message === "Success"){
            console.log("PAYLOAD====>", response.data.data)
            yield put(loadAdminSuccess(response.data.data))
        }
    }catch(error){
        yield put(loadAdminError(error.response))
    }
}

export function* onCreateAdminStartAsync({payload}){
    try{
        const response = yield call(createAdminApi, payload)
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(createAdminSuccess(response.data.data))
            Toast.fire({
                icon : "success",
                title:response.data.message,
            })
        }else{
            Toast.fire({
                icon : "error",
                title: response.data.errors.name,
            });
        }
    }catch(error){
        yield put(createAdminError(error.response.data))
    }
}

export function* onGetSingleAdminStartAsync({ payload }){
    try{
        const response = yield call(getSingleAdminApi, payload);
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.status === 200){
            yield put(getSingleAdminSuccess(response.data.data))
            console.log("response-----", response.data.data)
        }
    }catch(error){
        yield put(getSingleAdminError(error.response))
    }
}
export function* onUpdateAdminStartAsync({ payload }){
    try {
      const response = yield call(updateAdminApi, payload)
      console.log("PAyload¬¬¬¬¬", response);
      if(response.data.status === 200){
          yield put(updateAdminSuccess(response.data.data))
          console.log("resposne-------", response.data.data)
          Toast.fire({
            icon : "success",
            title:response.data.message
        })
      }else{
        Toast.fire({
            icon : "error",
            title: response.data.errors.name,
        });
      }
    }catch(error){
      yield put(updateAdminError(error.response))
    }
  }

export function* onDeleteAdminStartAsync({ payload }){
    try{
      const response = yield call(deleteAdminApi, payload)
      if(response.data.message === "Success"){
          yield delay(500)
          yield put(deleteAdminSuccess(response.data))
          Toast.fire({
              icon: "success",
              title: response.data.message,
          });
      }else{
          Toast.fire({
              icon: "error",
              title: response.data.message,
          });
      }
    }catch(error){
      yield put(deleteAdminError(error.response))
    }
  }

export function* onAdminLogin(){
    yield takeLatest(types.ADMIN_LOGIN_START, onAdminLoginStartAsync)
}

export function* onAdminChangePassword() {
    yield takeLatest(types.ADMIN_CHANGE_PASSWORD_START, onAdminChangePasswordStartAsync);
}

export function* onAdminLogout() {
    yield takeLatest(types.ADMIN_LOGOUT_START, onAdminLogoutStartAsync);
}

export function* onLoadAdmin(){
    yield takeEvery(types.LOAD_ADMIN_START, onLoadAdminStartAsync)
}

export function* onCreateAdmin(){
    yield takeLatest(types.CREATE_ADMIN_START, onCreateAdminStartAsync)
}

export function* onGetSingleAdmin(){
    yield takeEvery(types.GET_SINGLE_ADMIN_START, onGetSingleAdminStartAsync)
}

export function* onDeleteAdmin(){
    yield takeLatest(types.DELETE_ADMIN_START, onDeleteAdminStartAsync) 
}

export function* onUpdateAdmin(){
    yield takeEvery(types.UPDATE_ADMIN_START, onUpdateAdminStartAsync)
}

const adminSagas = [
    fork(onAdminLogin),
    fork(onAdminChangePassword),
    fork(onAdminLogout),
    fork(onLoadAdmin),
    fork(onCreateAdmin),
    fork(onGetSingleAdmin),
    fork(onDeleteAdmin),
    fork(onUpdateAdmin)
]

export default function* adminSaga(){
    yield all([...adminSagas])
}