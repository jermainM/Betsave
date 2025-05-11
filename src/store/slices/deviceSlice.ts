import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    country: "",
    isoAlpha2: "",  
    ipAddress: "",
  },
  reducers: {
    setIsoAlpha2: (state, action: PayloadAction<string>) => {
      state.isoAlpha2 = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setIpAddress: (state, action: PayloadAction<string>) => {
      state.ipAddress = action.payload;
    },
  },  
});

export const { setCountry, setIpAddress, setIsoAlpha2 } = deviceSlice.actions;
export default deviceSlice.reducer;
