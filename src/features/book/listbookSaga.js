import { fork, put,debounce } from "redux-saga/effects";
import bookapi from "../../api/bookapi";
import { getListbook, getListbookFalied, getListbookSuccess } from "./listbookSlice";

function* getdata(action){
    const datares=yield bookapi.getlistbook(action.payload.page,action.payload.query);
    if(datares){
    
        yield put(getListbookSuccess(datares))
    }else{
        yield put(getListbookFalied)
    }
}
function* watch(){
    yield debounce(600,getListbook,getdata)

 }
export default function* ListbookSaga(){
    yield fork(watch)
   
}