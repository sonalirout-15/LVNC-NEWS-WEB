import * as types from '../ActionTypes/SubcategoryActionTypes'
import { 
    takeLatest, 
    put, 
    fork, 
    call, 
    all, 
    takeEvery, 
    delay } from "redux-saga/effects";
import Swal from 'sweetalert2';
import { createSubcategoryApi, deleteSubcategoryApi, getSingleSubcategoryApi, loadSubcategoryApi, updateSubcategoryApi } from '../APIs/SubcategoryAPI';
import { createSubcategoryError, createSubcategorySuccess, deleteSubcategoryError, deleteSubcategorySuccess, getSingleSubcategoryError, getSingleSubcategorySuccess, loadSubcategoryError, loadSubcategorySuccess, updateSubcategoryError, updateSubcategorySuccess } from '../Actions/SubcategoryActions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadSubcategoryStartAsync(){ 
    try{ 
        const response = yield call(loadSubcategoryApi);
        if(response.data.message === "Success"){
            console.log("PAYLOAD====>", response.data)
            yield put(loadSubcategorySuccess(response.data))
        }
    }catch(error){
        yield put(loadSubcategoryError(error.response))
    }
}

export function* onGetSingleSubcategoryStartAsync({ payload }){
    try{
        const response = yield call(getSingleSubcategoryApi, payload);
        // console.log("PAyload¬¬¬¬¬!!!!!", response.data.cateData)
        if(response.data.message === "Success"){
            yield put(getSingleSubcategorySuccess(response.data.cateData))
            console.log("response-----", response.data.cateData)
        }
    }catch(error){
        yield put(getSingleSubcategoryError(error.response))
    }
}
export function* onCreateSubcategoryStartAsync({payload}){
    try{
        const response = yield call(createSubcategoryApi, payload)
        // console.log("PAyload¬¬¬¬¬", response);
        if(response.data.status === 200){
            yield put(createSubcategorySuccess(response.data.subCateData))
            console.log("Response!!!!!", response.data.subCateData)
            Toast.fire({
                icon : "success",
                title:response.data.message
            })
        }else{
            Toast.fire({
                icon : "error",
                title: response.data.errors.subcategory_name,
            });
        }
    }catch(error){
        yield put(createSubcategoryError(error.response.data))
    }
}

export function* onDeleteSubcategoryStartAsync({ payload }){
    try{
      const response = yield call(deleteSubcategoryApi, payload)
      console.log("PAyload¬¬¬¬¬", response);
      if(response.data.message === "Success"){
          yield delay(500)
          yield put(deleteSubcategorySuccess(response.data))
          console.log("RESPONSE--------->>", response.data)
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
      yield put(deleteSubcategoryError(error.response.data))
    }
  }

export function* onUpdateSubcategoryStartAsync({ payload }){
    try{
      const response = yield call(updateSubcategoryApi, payload)
    //   console.log("PAYLOAD=======>", response.data.cateData)
      if(response.data.message === "Success"){
          yield put(updateSubcategorySuccess(response.data.cateData))
          console.log("RESPONSE!!!!!", response.data.cateData)
          Toast.fire({
            icon: "success",
            title: response.data.message,
        });
      }else{
        if (payload.subcategory_name === '') {
            Toast.fire({
                icon: "error",
                title: response.data.errors.subcategory_name,
            });
        }  else if (payload.category_ref_id === '') {
            Toast.fire({
                icon: "error",
                title: response.data.errors.category_ref_id,
            });
        } 
      }
    }catch(error){
      yield put(updateSubcategoryError(error.response.data))
    }
  }

export function* onLoadSubcategory(){
    yield takeEvery(types.LOAD_SUBCATEGORY_START, onLoadSubcategoryStartAsync)
}

export function* onCreateSubcategory(){
    yield takeLatest(types.CREATE_SUBCATEGORY_START, onCreateSubcategoryStartAsync)
}

export function* onGetSingleSubcategory(){
    yield takeLatest(types.GET_SINGLE_SUBCATEGORY_START, onGetSingleSubcategoryStartAsync)
}

export function* onDeleteSubcategory(){
  yield takeLatest(types.DELETE_SUBCATEGORY_START, onDeleteSubcategoryStartAsync)
}

export function* onUpdateSubcategory(){
    yield takeEvery(types.UPDATE_SUBCATEGORY_START, onUpdateSubcategoryStartAsync)
}


const subcategoriesSagas = [
    fork(onLoadSubcategory),
    fork(onGetSingleSubcategory),
    fork(onCreateSubcategory),
    fork(onDeleteSubcategory),
    fork(onUpdateSubcategory)
]

export default function* subcategorySaga(){
    yield all([...subcategoriesSagas])
}