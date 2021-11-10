import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,
    namebook:"none",
    listChapter:null,
    dataChapter:{
        content:"" //tránh lỗi
    }
    
}
const editchapterSlice= createSlice({
    name:'editchap',
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
        resetdata(state,action){
            state.dataChapter={
                content:"" //tránh lỗi
            }
        }
    }
})
export const {
    getListchapter,
    getListchapterSuccess,
    getdatachapter,
    getdatachapterSuccess,
    getdatachapterFalse,
    getNameBook,
    getNameBookSuccess,
    resetdata
    }= editchapterSlice.actions

export const selectIsloading = (state)=>state.editchapter.isLoading
export const selectListchapter = (state)=>state.editchapter.listChapter // ra là lỗi ở đây
export const selectDataChapter = (state)=>state.editchapter.dataChapter
export const selectIdbookPresent = (state)=>state.editchapter.idbook
export const selectNameBook = (state)=>state.editchapter.namebook
const editchapterReducer= editchapterSlice.reducer;
export default editchapterReducer