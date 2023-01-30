import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const adminToken = localStorage.getItem("adminToken");
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
 return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/admin/getUsers`,
     {headers: { token: adminToken }} )
    .then((response) => response.data);
});

 const allUsersSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.users = []
        state.error = action.error.message;
    });
  },
});

export default allUsersSlice.reducer; 
