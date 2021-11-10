
import { fork, put,takeLatest } from "redux-saga/effects";
import bookapi from "../../api/bookapi";
import {getListchapter,getListchapterSuccess,getdatachapter,getdatachapterSuccess,getdatachapterFalse,getNameBook,getNameBookSuccess} from './readbookSlice'

function* dataChapter(){
  //sau này phát triển thêm
  yield takeLatest(getdatachapter,handlegetDatachapter)// tránh việc vị dispatch quá nhiều 
}
function* handlegetDatachapter(action){

  const datares = yield bookapi.getdataChapter(action.payload.idbook,action.payload.chapter)

  if(datares){
    
    yield put(getdatachapterSuccess(datares))
  }else{
    yield put(getdatachapterFalse())
  }
}

function* handlegetlistchapter(action){

  const datares =yield bookapi.getlistchapter(action.payload)

  if(datares){
    yield put(getListchapterSuccess(datares))
  }
}
function* listchapter(){
  //sau này phát triển thêm
  yield takeLatest(getListchapter,handlegetlistchapter)
 

}

function* getnamebook(){
  //sau này phát triển thêm
  yield takeLatest(getNameBook,handlegetNameBook)
 

}
function* handlegetNameBook(action){
  const datares =yield bookapi.getnamebook(action.payload)

  if(datares){
    yield put(getNameBookSuccess(datares.namebook))
  }
}
function* watch(){
  yield fork(dataChapter)
 
  yield fork(getnamebook)
 yield fork(listchapter) 


 }
export default function* ReadbookSaga(){
    yield fork(watch)
   
}