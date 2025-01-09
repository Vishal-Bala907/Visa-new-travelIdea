import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    phone: "",
    role: "",
    auth: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.name = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.phone = action.payload.mobileNumber;
      state.auth = true; // Set auth to true, not state.name
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
