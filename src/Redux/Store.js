import { configureStore } from '@reduxjs/toolkit'
import userRducer from './UserSlice'
import postReducer from './PostSlice'
import  refreshReducer from './RefreshSlice'
import allUsersReducer from './AllUserSlice'
import  socketReducers  from './SocketSlice'

export default configureStore({
    reducer:{
        user:userRducer,
        post:postReducer,
        refresh: refreshReducer,
        allUsers:allUsersReducer,
        socket:socketReducers,
    }
})