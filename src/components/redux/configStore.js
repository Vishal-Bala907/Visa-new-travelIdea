import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import visaTypeSlice from "./slices/VisaTypeSlice";
import visaSlice from "./slices/Visas";
import visaRequestsReducer from "./slices/VisaRequest";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  visaType: visaTypeSlice,
  visas: visaSlice,
  visaRequest: visaRequestsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);
