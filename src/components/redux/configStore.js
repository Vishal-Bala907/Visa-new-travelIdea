import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import visaTypeSlice from "./slices/VisaTypeSlice";
import visaSlice from "./slices/Visas";

const store = configureStore({
  reducer: {
    user: userReducer,
    visaType: visaTypeSlice,
    visas: visaSlice,
  },
});

export default store;
