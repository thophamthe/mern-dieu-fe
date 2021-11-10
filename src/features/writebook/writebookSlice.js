import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,

    namebook:"none",
    listChapter:null,
    dataChapter:null
}
const writebookSlice= createSlice({
    name:'writebook',
    initialState,
    reducers:{
        createbook(state,action){
            state.isLoading=true
        }
    }
})
export const {
    createbook
    }= writebookSlice.actions


const writebookReducer= writebookSlice.reducer;
export default writebookReducer