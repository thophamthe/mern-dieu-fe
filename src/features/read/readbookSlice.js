import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,

    namebook:"none",
    listChapter:null,
    dataChapter:{}
}
const readbookSlice= createSlice({
    name:'readbook',
    initialState,
    reducers:{
        getNameBook(state,action){
            state.isLoading=true;
        },
        getNameBookSuccess(state,action){
            state.namebook=action.payload;
        },
        getListchapter(state){
            state.isLoading=true;
        },
        getListchapterSuccess(state,action){
            state.listChapter=action.payload;
            state.isLoading=false;
        },
        getdatachapter(state, action){
            state.isLoading=true;
            state.chapter=action.payload.chapter
        },
        getdatachapterSuccess(state,action){
            state.isLoading=false;
            state.dataChapter=action.payload
        },
        getdatachapterFalse(state){
            state.isLoading=false
        },
        
    }
})
export const {
    getListchapter,
    getListchapterSuccess,
    getdatachapter,
    getdatachapterSuccess,
    getdatachapterFalse,
    getNameBook,
    getNameBookSuccess
    }= readbookSlice.actions

export const selectIsloading = (state)=>state.readbook.isLoading
export const selectListchapter = (state)=>state.readbook.listChapter
export const selectDataChapter = (state)=>state.readbook.dataChapter
export const selectIdbookPresent = (state)=>state.readbook.idbook
export const selectNameBook = (state)=>state.readbook.namebook
const reabookReducer= readbookSlice.reducer;
export default reabookReducer