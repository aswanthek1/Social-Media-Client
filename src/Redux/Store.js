import { configureStore } from '@reduxjs/toolkit'
import userRducer from './UserSlice'

export default configureStore({
    reducer:{
        user:userRducer,
    }
})