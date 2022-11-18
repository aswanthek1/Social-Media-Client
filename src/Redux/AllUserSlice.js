import { createSlice } from '@reduxjs/toolkit'

export const allUsersSlice = createSlice({
    name:'allUsers',
    initialState:{
        allUsers:[]
    },
    reducers:{
        addAllUsers: ( state, action ) => {
            state.allUsers = action.payload
        }
    }
})



export const { addAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer