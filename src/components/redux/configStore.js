import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import visaTypeSlice from "./slices/VisaTypeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    visaType: visaTypeSlice,
  },
});

export default store;
