import * as types from '../ActionTypes/CategoryActionTypes';

import { 
    takeLatest, 
    put, 
    fork, 
    call, 
    all,
    delay,
    takeEvery
 } from "redux-saga/effects";
import Swal from 'sweetalert2';
import { 
    createCategoryApi, 
    deleteCategoryApi, 
    getSingleCategoryApi, 
    loadCategoryApi, 
    updateCategoryApi 
} from '../APIs/CategoryAPI';
import {  
    createCategoryError, 
    createCategorySuccess, 
    deleteCategoryError, 
    deleteCategorySuccess, 
    getSingleCategorySuccess, 
    loadCategoryError, 
    loadCategorySuccess, 
    updateCategoryError, 
    updateCategorySuccess 
} from '../Actions/CategoryAction';


const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
});

export function* onLoadCategoryStartAsync(){
    try{
        const response = yield call(loadCategoryApi);
       
        if(response.data.message === "Success"){
            console.log("PAYLOAD====>", response.data)
            yield put(loadCategorySuccess(response.data))
        }
    }catch(error){
        yield put(loadCategoryError(error.response))
    }
}

export function* onGetSingleCategoryStartAsync({ payload }){
    try{
        const response = yield call(getSingleCategoryApi, payload);
        // console.log("PAyload¬¬¬¬¬!!!!!", response.data.categoryData[0])
        if(response.data.message === "Success"){
            yield put(getSingleCategorySuccess(response.data.categoryData))
            // console.log("response-----", response.data)
        }
    }catch(error){
        yield put(getSingleCategorySuccess(error.response))
    }
}

export function* onCreateCategoryStartAsync({payload}){
    try{
        const response = yield call(createCategoryApi, payload)
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(createCategorySuccess(response.data.data))
            Toast.fire({
                icon : "success",
                title:response.data.message
            })
        }else{
            Toast.fire({
                icon : "error",
                title: response.data.errors.category_name,
            });
        }
    }catch(error){
        yield put(createCategoryError(error.response.data))
    }
}

export function* onDeleteCategoryStartAsync({ payload }){
  try{
    const response = yield call(deleteCategoryApi, payload)
    console.log("PAyload¬¬¬¬¬", response);
    if(response.data.message === "Success"){
        yield delay(500)
        yield put(deleteCategorySuccess(response.data))
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
    yield put(deleteCategoryError(error.response))
  }
}

export function* onUpdateCategoryStartAsync({ payload }){
    try {
      const response = yield call(updateCategoryApi, payload)
      if(response.data.message === "Success"){
        console.log("resposne-------", response.data)
          yield put(updateCategorySuccess(response.data))
          Toast.fire({
            icon : "success",
            title:response.data.message
        })
      }else{
        Toast.fire({
            icon : "error",
            title: response.data.errors.category_name,
        });
      }
    }catch(error){
      yield put(updateCategoryError(error.response.data))
    }
  }

export function* onLoadCategory(){
    yield takeLatest(types.LOAD_CATEGORY_START, onLoadCategoryStartAsync)
}

export function* onGetSingleCategory(){
    yield takeEvery(types.GET_SINGLE_CATEGORY_START, onGetSingleCategoryStartAsync)
}

export function* onCreateCategory(){
    yield takeLatest(types.CREATE_CATEGORY_START, onCreateCategoryStartAsync)
}

export function* onDeleteCategory(){
  yield takeLatest(types.DELETE_CATEGORY_START, onDeleteCategoryStartAsync)
}

export function* onUpdateCategory(){
    yield takeLatest(types.UPDATE_CATEGORY_START, onUpdateCategoryStartAsync)
}


const categoriesSagas = [
    fork(onLoadCategory),
    fork(onGetSingleCategory),
    fork(onCreateCategory),
    fork(onDeleteCategory),
    fork(onUpdateCategory)
]

export default function* categorySaga(){
    yield all([...categoriesSagas])
}