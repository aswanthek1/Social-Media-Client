import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:'post',
    initialState:{
        post:[]
    },
    reducers:{
        postUpdate: ( state, action ) =>{
            state.post = action.payload
        }
    }
})

export const { postUpdate } = postSlice.actions
export default postSlice.reducer