import { createSlice } from "@reduxjs/toolkit"



const initialState={
    loading:false,
    data:null,
    pagination:{
        
    }
}
const listbookSlice=createSlice({
    name:'listbook',
    initialState,
    reducers:{
        getListbook(state,action){
           state.loading=true
        },
        getListbookSuccess(state,action){
            state.loading=false
            state.data=action.payload.arrayDocument
            state.pagination=action.payload.pagination
        },
        getListbookFalied(state){
            state.loading=false
            console.log("lấy listbook lỗi")
        }
    }
})
export const {getListbook,getListbookSuccess,getListbookFalied}=listbookSlice.actions;

export const selectLoading=(state)=>state.listbook.loading;
export const selectListbook=(state)=>state.listbook.data;
export const selectPagination=(state)=> state.listbook.pagination
const ListbookReducer= listbookSlice.reducer;
export default ListbookReducer;