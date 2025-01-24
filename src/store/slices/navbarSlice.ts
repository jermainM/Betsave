import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  activeItem: string; // Current active nav item
}

const initialState: NavbarState = {
  activeItem: 'Cashback', // Default active nav item
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveItem(state, action: PayloadAction<string>) {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navbarSlice.actions;
export default navbarSlice.reducer;
