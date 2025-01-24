import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  activeItem: number; // Current active nav item
}

const initialState: NavbarState = {
  activeItem: 0, // Default active nav item
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveItem(state, action: PayloadAction<number>) {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navbarSlice.actions;
export default navbarSlice.reducer;
