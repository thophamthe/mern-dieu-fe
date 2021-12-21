
import { createSlice } from "@reduxjs/toolkit"



const initialState={
    isLoading:false,
    databook:{
        idbook:"none",
        namebook:"none",
       
        chapternumber: 0,
        chaptertotal: 0,
        pricebook:0,
        description:'',
        urlimg:""
    },
};
const bookdetailSlice=createSlice({
    name:'bookdetail',
    initialState,
    reducers:{
        getdatabook(state,action){
            state.isLoading=true;
        },
        getbookdetailSuccess(state,action){
           
            state.databook=action.payload;
            state.isLoading=false;
        },
        getbookdetailFalied(state){
            console.log("lấy databook lỗi")
            state.isLoading=false;

        },
        updatebook(state,action){
            console.log(action.payload)
          
            state.databook={
                idbook:action.payload.idbook,
                status:true,
                namebook:action.payload.namebook,
                chapternumber:action.payload.chapternumber,
                chaptertotal: action.payload.chaptertotal,
                pricebook:action.payload.pricebook,
                description:action.payload.description,
                urlimg:action.payload.urlimg,
            }
         
        }

    }
})
export const {getdatabook,getbookdetailSuccess,getbookdetailFalied, updatebook}=bookdetailSlice.actions;

export const selectLoading=(state)=>state.bookdetail.isLoading;
export const selectdatabook=(state)=>state.bookdetail.databook;
export const selectNameBookPresent=(state)=>state.bookdetail.databook.namebook;
const BookdetailReducer= bookdetailSlice.reducer;
export default BookdetailReducer;  