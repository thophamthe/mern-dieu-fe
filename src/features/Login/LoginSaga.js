
import { push } from "connected-react-router";
import { fork ,take, put,call,takeLatest} from "redux-saga/effects";
import userapi from "../../api/userapi";
import { checkTimeOut } from "../../utils/checkToken";
import { login,loginSuccess,loguot, loginWtoken ,getdatabookforuser,getdatabookforuserSuccess} from "./Loginslice";

function* setlocal(token,refreshtoken){
    
    yield localStorage.setItem('token',token)
    yield localStorage.setItem('refreshtoken',refreshtoken)
}
function* handleLogin(payload){
   const datares= yield userapi.login(payload)
    if(datares.user!=null){
        
        yield put(loginSuccess(datares.user))
        yield call(setlocal,datares.token,datares.refreshtoken)
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
    yield localStorage.removeItem('refreshtoken')
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
        if(checkTimeOut()>1000){
            const result=yield userapi.loginWtoken()
            yield put(loginWtoken(result))
        }else{
            let res= yield userapi.newtoken();
            if(res){
              yield localStorage.setItem('token', res.token)
              yield localStorage.setItem('refreshtoken', res.refreshtoken)
              const result=yield userapi.loginWtoken()
              yield put(loginWtoken(result))
       
            }
        }
        
        
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