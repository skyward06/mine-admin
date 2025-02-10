import type { PayloadAction } from '@reduxjs/toolkit';
import type { FrontAction } from 'src/__generated__/graphql';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

interface FrontActionState {
  data?: FrontAction[];
}

const initialState: FrontActionState = {
  data: [],
};

const frontActionSlice = createSlice({
  name: 'frontAction',
  initialState,
  reducers: {
    setFrontActions: (state, action: PayloadAction<FrontAction[]>) => {
      state.data = action.payload;
    },
    popFirstAction: (state) => {
      if (state.data) {
        const [, ...rest] = state.data;
        state.data = rest;
      }
    },
  },
});

// Export the action
export const { setFrontActions, popFirstAction } = frontActionSlice.actions;

// Export the reducer to be used in the store
export default frontActionSlice.reducer;
