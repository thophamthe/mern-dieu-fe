
import { take,fork} from "redux-saga/effects";

import {createbook} from './writebookSlice'


function* watch(){
  
  yield take(createbook)

 }
export default function* CreatebookSaga(){
    yield fork(watch)
   
}