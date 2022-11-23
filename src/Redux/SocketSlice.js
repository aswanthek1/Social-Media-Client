import { createSlice } from "@reduxjs/toolkit";

export const SocketSlice = createSlice({
  name: "socket",
  initialState: "",

  reducers: {
    socketReducers: (state, action) => {
      state = action.payload;
    },
  },
});

export const { socketReducers } = SocketSlice.actions;
export default SocketSlice.reducer;
