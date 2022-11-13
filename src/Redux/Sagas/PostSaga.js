import * as types from '../ActionTypes/PostActionTypes';
import { 
    takeLatest, 
    put, 
    fork, 
    call, 
    all, 
    takeEvery, 
    delay } from "redux-saga/effects";
import Swal from 'sweetalert2';
import { createPostApi, deletePostApi, getSinglePostApi, loadPostApi, updatePostApi } from '../APIs/PostAPI';
import { createPostError, createPostSuccess, deletePostError, deletePostSuccess, getSinglePostError, getSinglePostSuccess, loadPostError, loadPostSuccess, updatePostError, updatePostSuccess } from '../Actions/PostActions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});


export function* onLoadPostStartAsync(){
    try{
        const response = yield call(loadPostApi);
       if(response.data.message === "Success"){
        console.log("PAYLOAD====>", response.data.postData)
        yield put(loadPostSuccess(response.data.postData))
        console.log("response-----", response.data.postData)
        }
    }catch(error){
        yield put(loadPostError(error.response))
    }
}

export function* onGetSinglePostStartAsync({payload}){
    try{
        const response = yield call(getSinglePostApi, payload);
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(getSinglePostSuccess(response))
            console.log("response-----", response)
        }
    }catch(error){
        yield put(getSinglePostError(error.response))
    }
}

export function* onCreatePostStartAsync({payload}){
    try{
        const response = yield call(createPostApi, payload)
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.status === 200){
            yield put(createPostSuccess(response))
            console.log("Response!!!!!", response)
            Toast.fire({
                icon : "success",
                title:response.data.message
            })
        }else{
            Toast.fire({
                icon : "error",
                title: response.data.errors.message,
            });
        }
    }catch(error){
        yield put(createPostError(error.response))
    }
}

function* onDeletePostStartAsync({ payload }){
  try{
    const response = yield call(deletePostApi, payload)
    if(response.data.message === "Success"){
        yield delay(500)
        yield put(deletePostSuccess(response.data))
         Toast.fire({
            icon : "success",
            title:response.data.message
        })
    }else{
        Toast.fire({
            icon : "error",
            title:response.data.message
        })
    }
  }catch(error){
    yield put(deletePostError(error.response.data))
  }
}

function* onUpdatePostStartAsync({payload}){
    try{
      const response = yield call(updatePostApi, payload)
      if(response.status === 200){
          yield put(updatePostSuccess(response.data))
          Toast.fire({
            icon : "success",
            title:response.data.message
        })
      }else{
        Toast.fire({
            icon : "error",
            title:response.data.message
        })
      }
    }catch(error){
      yield put(updatePostError(error.response))
    }
  }

export function* onLoadPost(){
    yield takeEvery(types.LOAD_POST_START, onLoadPostStartAsync)
}

export function* onGetSinglePost(){
    yield takeEvery(types.GET_SINGLE_POST_START, onGetSinglePostStartAsync)
}

export function* onCreatePost(){
    yield takeEvery(types.CREATE_POST_START, onCreatePostStartAsync)
}

export function* onDeletePost(){
    yield takeEvery(types.DELETE_POST_START, onDeletePostStartAsync)
}

export function* onUpdatePost(){
    yield takeEvery(types.UPDATE_POST_START, onUpdatePostStartAsync)
}


const postSagas = [
    fork(onLoadPost),
    fork(onGetSinglePost),
    fork(onCreatePost),
    fork(onDeletePost),
    fork(onUpdatePost)
]

export default function* postSaga(){
    yield all([...postSagas])
}