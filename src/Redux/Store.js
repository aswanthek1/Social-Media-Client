import { configureStore } from '@reduxjs/toolkit'
import userRducer from './UserSlice'
import postReducer from './PostSlice'
import  refreshReducer from './RefreshSlice'

export default configureStore({
    reducer:{
        user:userRducer,
        post:postReducer,
        refresh: refreshReducer
    }
})