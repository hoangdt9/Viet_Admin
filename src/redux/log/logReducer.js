import { createSlice } from "@reduxjs/toolkit";

const initialLogState = {
  allLogs: [],
  count : 10,
  page : 1,
  allCount : 0
};

const logSlice = createSlice({
  name: "logSlice",
  initialState: initialLogState,
  reducers: {
    setAllLogs(state, action) {
      state.allLogs = action.payload;
    },
    setAllCount(state, action) {
        state.allCount = action.payload;
    }
  },
});

export const logReducerActions = logSlice.actions;
export default logSlice;