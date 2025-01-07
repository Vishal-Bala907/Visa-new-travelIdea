import { createSlice } from "@reduxjs/toolkit";

const visaSlice = createSlice({
  name: "visas",
  initialState: {
    visas: [],
  },
  reducers: {
    addAllVisas: (state, action) => {
      state.visas = action.payload;
    },
  },
});

export const { addAllVisas } = visaSlice.actions;
export default visaSlice.reducer;
