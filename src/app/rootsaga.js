import {all} from 'redux-saga/effects'
import ListbookSaga from '../features/book/listbookSaga';
import BookdetailSaga from '../features/bookdetail/bookdetailSaga';
import EditchapterSaga from '../features/editchapter/editchapSaga';
import LoginSaga from '../features/Login/LoginSaga'
import ReadbookSaga from '../features/read/readbookSaga';
import WritebookSaga from '../features/writebook/writebookSaga';

function* testsaga(){
    yield console.log("Saga đã chạy")
}
 
export default function* rootSaga(){
    yield all([
        testsaga(),
        LoginSaga(),
        ListbookSaga(),
        BookdetailSaga(),
        ReadbookSaga(),
        WritebookSaga(),
        EditchapterSaga()
    ]);
}