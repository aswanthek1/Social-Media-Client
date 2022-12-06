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
        profileimage:'',
        followers:'',
        following:'',
        bio:'',
        livesin:'',
        country:'',
        dateofbirth:'',
        proffession:'',
        savedPosts:'',
        saved:''
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
            state.following = action.payload.following
            state.followers = action.payload.followers
            state.bio = action.payload.bio
            state.livesin = action.payload.livesin
            state.country = action.payload.country
            state.dateofbirth = action.payload.dateofbirth
            state.proffession = action.payload.proffession
            state.savedPosts = action.payload.savedPosts
            state.saved = action.payload.saved
        }
    }
})

export const  { update } = userSlice.actions
export default userSlice.reducer 