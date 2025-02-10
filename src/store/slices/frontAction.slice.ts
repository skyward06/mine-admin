import type { PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

interface FrontActionState {
  data?: any;
}

const initialState: FrontActionState = {
  data: null,
};

const frontActionSlice = createSlice({
  name: 'frontAction',
  initialState,
  reducers: {
    setFrontAction: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

// Export the action
export const { setFrontAction } = frontActionSlice.actions;

// Export the reducer to be used in the store
export default frontActionSlice.reducer;
