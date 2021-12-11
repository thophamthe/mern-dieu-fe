import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading:false,
    logging:false,
    currentuser:{
        fullname:'None',
        from:"None",
        gmail:"None",
        phonenumber:"None",
        price:0,
        urlimg:"avata/avatardefault.png"
    },
    databookforuser:{}
};
 
const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.logging=true
        },
        loginSuccess(state,action){
            state.logging=true;
            state.currentuser=action.payload
        },
        loginFalied(state,action){
            state.logging=false;
        },
        loguot(state){
            state.logging=false;
            
            
            /* bỏ qua cái này , haizz , vì homepage dùng selector lấy URL img của avt
            set về null thì nó k đọc được nữa , lỗi luôn , khóc
            */
        },
        loginWtoken(state,action){
            state.logging=true;
            state.currentuser=action.payload
        },
        getdatabookforuser(state,action){

            state.loading=true;
        },
        getdatabookforuserSuccess(state,action){
            state.loading=false
            state.databookforuser=action.payload
        },
        updateuser(state,action){
           state.currentuser.fullname=action.payload.fullname
           state.currentuser.from=action.payload.from
           state.currentuser.gmail=action.payload.gmail
           state.currentuser.phonenumber=action.payload.phonenumber      
           state.currentuser.urlimg=action.payload.urlimg
        },
        topup(state,action){
            state.currentuser.price=action.payload
        },
     afterbuy(state, action){
         state.currentuser.price=state.currentuser.price- action.payload;
     }
    }
})
export const {login,loginSuccess,loginFalied,loguot,loginWtoken,getdatabookforuser,getdatabookforuserSuccess,updateuser,topup,afterbuy}= authSlice.actions;

export const selectLogging=(state)=>state.auth.logging
export const selectLoading=(state)=>state.auth.loading
export const selectdatauser=(state)=>state.auth.currentuser
export const selectusername=(state)=>state.auth.currentuser.username
export const selectlistbook=(state)=>state.auth.databookforuser
const authReducer= authSlice.reducer;
export default authReducer;