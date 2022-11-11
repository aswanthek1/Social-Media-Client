import { configureStore } from '@reduxjs/toolkit'
import userRducer from './UserSlice'
import postReducer from './PostSlice'

export default configureStore({
    reducer:{
        user:userRducer,
        post:postReducer
    }
})