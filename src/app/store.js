import { combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootsaga';
import authReducer from '../features/Login/Loginslice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils';
import ListbookReducer from '../features/book/listbookSlice';
import BookdetailReducer from '../features/bookdetail/bookdetailSlice';
import reabookReducer from '../features/read/readbookSlice';
import writebookReducer from '../features/writebook/writebookSlice'
import createbookReducer from '../features/createbook/createbookSlice';
import editchapterReducer from '../features/editchapter/editchapSlice';
const rootReduce= combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  listbook:ListbookReducer,
  bookdetail:BookdetailReducer,
  readbook:reabookReducer,
  writebook: writebookReducer,
  createbook: createbookReducer,
  editchapter:editchapterReducer
})
const SagaMiddleware=  createSagaMiddleware()
export const store = configureStore({
  reducer:rootReduce,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(SagaMiddleware,routerMiddleware(history))
});
SagaMiddleware.run(rootSaga)
