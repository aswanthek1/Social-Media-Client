import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:'post',
    initialState:{
        post:[]
    },
    reducers:{
        postUpdate: ( state, action ) =>{
            state.post = action.payload
        },
        updatePostOnload: (state, action) =>{
            state.post.unshift(action.payload)
        },
        
    }
})

export const { postUpdate, updatePostOnload } = postSlice.actions
export default postSlice.reducer