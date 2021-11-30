import { yellow } from "@material-ui/core/colors";
import { push } from "connected-react-router";
import { fork ,take, put,call,takeLatest} from "redux-saga/effects";
import userapi from "../../api/userapi";
import { login,loginSuccess,loguot, loginWtoken ,getdatabookforuser,getdatabookforuserSuccess} from "./Loginslice";

function* setlocal(token){
    
    yield localStorage.setItem('token',token)
}
function* handleLogin(payload){
   const datares= yield userapi.login(payload)
   console.log(payload)
    if(datares.user!=null){
        yield put(loginSuccess(datares.user))
        yield call(setlocal,datares.token)
        yield put(push('/book')) 
    }
    else{
        alert("sai tài khoản hoặc mật khẩu")
        yield put(push('/login'))
        
    }
}
function* logintoken(){
    const result=yield userapi.loginWtoken()
            yield put(loginWtoken(result))
}
function* removelocal(){
    yield localStorage.removeItem('token')
}
function* handleLoguot(){

   yield call(removelocal)
   yield put(push('/login'))
}
function* watchlogin(){
    if(!localStorage.getItem('token')){
        const action = yield take(login)   
        yield fork(handleLogin,action.payload)
       
    }
    else{
        const result=yield userapi.loginWtoken()
        yield put(loginWtoken(result))
    }
    
   
}
function* watchlogout(){
    yield take(loguot)
    yield fork(handleLoguot)
 }
function* databookforuser(){
    const datares= yield userapi.getdatabookforuser()
    if(datares){
       
        yield put(getdatabookforuserSuccess(datares))
    }
    else{
        alert("sai tài khoản hoặc mật khẩu")
    }
}
function* watchgetlistbook(){
    yield takeLatest(getdatabookforuser,databookforuser)        
}
export default function* LoginSaga(){
    yield fork(watchlogin)
    yield fork(watchlogout)
    yield fork(watchgetlistbook)
  
}