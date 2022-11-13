import * as types from '../ActionTypes/CampaningActionTypes';
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
    createCampaningApi, 
    deleteCampaningApi, 
    getSingleCampaningApi, 
    loadCampaningApi, 
    updateCampaningApi 
} from '../APIs/CampaningAPI';
import { 
    createCampaningError, 
    createCampaningSuccess, 
    deleteCampaningError, 
    deleteCampaningSuccess, 
    getSingleCampanaingError, 
    getSingleCampaningSuccess, 
    loadCampaningError, 
    loadCampaningSuccess, 
    updateCampaningError, 
    updateCampaningSuccess 
} from '../Actions/CampaningActions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});


export function* onLoadCampaningStartAsync(){
    try{
        const response = yield call(loadCampaningApi);
       
        if(response.data.message === "Success"){
            console.log("PAYLOAD====>", response.data)
            yield put(loadCampaningSuccess(response.data))
        }
    }catch(error){
        yield put(loadCampaningError(error.response))
    }
}

export function* onGetSingleCampaningStartAsync({payload}){
    try{
        const response = yield call(getSingleCampaningApi, payload);
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(getSingleCampaningSuccess(response.data.CampaningData))
            console.log("Response------->>>", response.data.CampaningData)
        }
    }catch(error){
        yield put(getSingleCampanaingError(error.response))
    }
}

export function* onCreateCampaningStartAsync({payload}){
    try{
        const response = yield call(createCampaningApi, payload)
        console.log("PAyload¬¬¬¬¬", response);
        if(response.data.message === "Success"){
            yield put(createCampaningSuccess(response.data.data))
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
        yield put(createCampaningError(error.response.data))
    }
}

export function* onDeleteCampaningStartAsync({ payload }){
    try{
      const response = yield call(deleteCampaningApi, payload)
      console.log("PAyload¬¬¬¬¬", payload);
      if(response.data.message === "Success"){
          yield delay(500)
          yield put(deleteCampaningSuccess(response.data.data))
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
      yield put(deleteCampaningError(error.response.data))
    }
  }

export function* onUpdateCampaningStartAsync({ payload }){
    try{
        const response = yield call(updateCampaningApi, payload)
        console.log("PAYLOAD========>", response)
        if(response.data.message === "Success"){
            yield put(updateCampaningSuccess())
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
        yield put(updateCampaningError(error.response))
    }
}

export function* onLoadCampaning(){
    yield takeEvery(types.LOAD_CAMPANING_START, onLoadCampaningStartAsync)
}

export function* onGetSingleCampaning(){
    yield takeEvery(types.GET_SINGLE_CAMPANING_START, onGetSingleCampaningStartAsync)
}

export function* onCreateCampaning(){
    yield takeLatest(types.CREATE_CAMPANING_START, onCreateCampaningStartAsync)
}

export function* onDeleteCampaning(){
    yield takeLatest(types.DELETE_CAMPANING_START, onDeleteCampaningStartAsync)
}

export function* onUpdateCampaning(){
    yield takeLatest(types.UPDATE_CAMPANING_START, onUpdateCampaningStartAsync)
}


const campaningSagas = [
    fork(onLoadCampaning),
    fork(onGetSingleCampaning),
    fork(onCreateCampaning),
    fork(onDeleteCampaning),
    fork(onUpdateCampaning)
]

export default function* campaningSaga(){
    yield all([...campaningSagas])
}