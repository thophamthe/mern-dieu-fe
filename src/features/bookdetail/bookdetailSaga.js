import { fork, put, take } from "redux-saga/effects";
import bookapi from "../../api/bookapi";
import { getbookdetailFalied, getbookdetailSuccess, getdatabook } from "./bookdetailSlice";

function* getdata(action){
    const datares=yield bookapi.getdatabook(action)
    if(datares){
        yield put(getbookdetailSuccess(datares))
    }else{
        yield put(getbookdetailFalied)
    }
}
function* watch(){
    while(true){
        const action= yield take(getdatabook)
         yield fork(getdata,action.payload)
    }
    

 }
export default function* BookdetailSaga(){
    
    yield fork(watch)
   
}