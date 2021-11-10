
import { take,fork, put,takeLatest } from "redux-saga/effects";
import bookapi from "../../api/bookapi";
import {createbook} from './writebookSlice'


function* watch(){
  
  yield take(createbook)

 }
export default function* CreatebookSaga(){
    yield fork(watch)
   
}