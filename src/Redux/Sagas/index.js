import {all} from 'redux-saga/effects';
import subcategoryReducer from '../Reducers/SubcategoryReducer';
import adminSaga from './AdminSaga';
import campaningSaga from './CampaningSaga';
import categorySaga from './CategorySaga';
import mettersSaga from './MettersSaga';
import postSaga from './PostSaga';
import subcategorySaga from './SubcategorySaga';

export default function* rootSaga(){
    yield all([
        adminSaga(),
        categorySaga(),
        subcategorySaga(),
        mettersSaga(),
        postSaga(),
        campaningSaga()
    ])
}