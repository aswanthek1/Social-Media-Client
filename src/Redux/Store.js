import { configureStore } from '@reduxjs/toolkit'
import userRducer from './UserSlice'
import postReducer from './PostSlice'
import  refreshReducer from './RefreshSlice'
import allUsersReducer from './AllUserSlice'

export default configureStore({
    reducer:{
        user:userRducer,
        post:postReducer,
        refresh: refreshReducer,
        allUsers:allUsersReducer
    }
})