import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        email:'',
        firstname:'',
        lastname:'',
        phonenumber:'',
        _id:'',
        coverimage:'',
        profileimage:''

    },

    reducers:{
        update: ( state, action ) => {
            state.email = action.payload.email
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.phonenumber = action.payload.phonenumber
            state._id = action.payload._id
            state.coverimage = action.payload.coverimage
            state.profileimage = action.payload.profileimage
        }
    }
})

export const  { update } = userSlice.actions
export default userSlice.reducer 