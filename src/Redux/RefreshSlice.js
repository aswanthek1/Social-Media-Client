import { createSlice } from "@reduxjs/toolkit";

export const Refresh = createSlice({
    name:'refresh',
    initialState:{
        refresh: false
    },
    reducers: {
        refreshReducer:(state, action) =>{
            state.refresh = !state.refresh
        }
    }
})

export const { refreshReducer } = Refresh.actions
export default Refresh.reducer