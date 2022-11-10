import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:'post',
    initialState:[
        {
            _id:'',
            userId:'',
            description:'',
            image:[],
            likes:[],
            comments:[],
            createdAt:''
        }
    ]
})