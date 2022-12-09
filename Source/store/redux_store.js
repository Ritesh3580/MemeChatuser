import {configureStore, createSlice} from '@reduxjs/toolkit';

const callSlice = createSlice({
  name: 'callData',
  initialState: {
    appData: null,
    roomId: ''
},
  reducers: {
    setCallData(state, action) {
      state.appData = action.payload;
    },
    removeCallData(state, action) {
        state.appData = null;
    },
    setRoom_id(state, action) {
      state.roomId = action.payload;
    },
  },
});

export const actions = callSlice.actions;

const store = configureStore({
  reducer: callSlice.reducer,
});

export default store;