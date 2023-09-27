import { createSlice } from "@reduxjs/toolkit";

const initialBackgroundState = {
  allIpAddress: [],
  ipState : true
};

const backgroundSlice = createSlice({
  name: "backgroundSlice",
  initialState: initialBackgroundState,
  reducers: {
    setAllIpAddress(state, action) {
      state.allIpAddress = action.payload;
      state.ipState = false;
    },
    setIpState(state, action){
        state.ipState = action.payload;
    }
  },
});

export const backgroundReducerActions = backgroundSlice.actions;
export default backgroundSlice;