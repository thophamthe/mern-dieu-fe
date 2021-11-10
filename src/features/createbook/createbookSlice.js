import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,

    namebook:"none",
    listChapter:null,
    dataChapter:null
}
const createbookSlice= createSlice({
    name:'createbook',
    initialState,
    reducers:{
        createbook(state,action){
            state.isLoading=true
        }
    }
})
export const {
    createbook
    }= createbookSlice.actions


const createbookReducer= createbookSlice.reducer;
export default createbookReducer