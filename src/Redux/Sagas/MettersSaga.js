import * as types from '../ActionTypes/MettersActionTypes'
import { 
    takeLatest, 
    put, 
    fork, 
    call, 
    all, 
    takeEvery, 
    delay } from "redux-saga/effects";
import Swal from 'sweetalert2';
import { 
    createMettersApi, 
    deleteMettersApi, 
    getSingleMettersApi, 
    loadMettersApi, 
    updateMettersApi 
} from '../APIs/MettersAPI';
import { 
    createMettersError, 
    createMettersSuccess, 
    deleteMettersError, 
    deleteMettersSuccess, 
    getSingleMettersError, 
    getSingleMettersSuccess, 
    loadMettersError, 
    loadMettersSuccess, 
    updateMettersError, 
    updateMettersSuccess 
} from '../Actions/MettersActions';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadMettersStartAsync(){
    try{
        const response = yield call(loadMettersApi);
       
        if(response.data.message === "Success"){
            console.log("PAYLOAD====>", response.data)
            yield put(loadMettersSuccess(response.data))

            console.log("response-----", response.data)
        }
    }catch(error){
        yield put(loadMettersError(error.response))
    }
}

export function* onGetSingleMettersStartAsync({payload}){
    try{
        const response = yield call(getSingleMettersApi, payload);
        console.log("PAyload¬¬¬¬¬!!!!!", response.data.metterData)
        if(response.data.message === "Success"){
            yield put(getSingleMettersSuccess(response.data.metterData))
            console.log("response-----<<<<<>>>>", response.data.metterData)  
        }
    }catch(error){
        yield put(getSingleMettersError(error.response))
    }
}

export function* onCreateMettersStartAsync({payload}){
    try{
        const response = yield call(createMettersApi, payload)
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(createMettersSuccess(response.data.data))
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
        yield put(createMettersError(error.response.data))
    }
}

export function* onDeleteMettersStartAsync({ payload }){
  try{
    const response = yield call(deleteMettersApi, payload)
    console.log("PAyload¬¬¬¬¬", response);
    if(response.data.message === 200){
        yield delay(500)
        yield put(deleteMettersSuccess(response.data))
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
    yield put(deleteMettersError(error.response.data))
  }
}

export function* onUpdateMettersStartAsync({ payload }){
    try{
      const response = yield call(updateMettersApi, payload)
      console.log("PAYLOAD----->", response)
      if(response.data.message === "Success"){
          yield put(updateMettersSuccess(response.data.data))
          console.log("RESPONSE=====?>", response.data.data)
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
      yield put(updateMettersError(error.response))
    }
  }

export function* onLoadMetters(){
    yield takeEvery(types.LOAD_METTERS_START, onLoadMettersStartAsync)
}

export function* onGetSingleMetters(){
    yield takeEvery(types.GET_SINGLE_METTERS_START, onGetSingleMettersStartAsync)
}

export function* onCreateMetters(){
    yield takeLatest(types.CREATE_METTERS_START, onCreateMettersStartAsync)
}

export function* onDeleteMetters(){
    yield takeLatest(types.DELETE_METTERS_START, onDeleteMettersStartAsync)
}

export function* onUpdateMetters(){
    yield takeEvery(types.UPDATE_METTERS_START, onUpdateMettersStartAsync)
}


const mettersSagas = [
    fork(onLoadMetters),
    fork(onGetSingleMetters),
    fork(onCreateMetters),
    fork(onDeleteMetters),
    fork(onUpdateMetters)
]

export default function* mettersSaga(){
    yield all([...mettersSagas])
}