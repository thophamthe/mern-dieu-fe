
import { take,fork, put,takeLatest } from "redux-saga/effects";
import bookapi from "../../api/bookapi";
import {createbook} from './createbookSlice'


function* watch(){
  
  yield take(createbook)

 }
export default function* WritebookSaga(){
    yield fork(watch)
   
}