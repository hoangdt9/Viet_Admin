import { createSlice } from "@reduxjs/toolkit";

const initialPermissionState = {
  allMerchants: [],
  merchantState : true,
  editProxy : {},
  allProxy : [],
  proxyState : true
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState: initialPermissionState,
  reducers: {
    setAllMerchant(state, action) {
      state.allMerchants = action.payload;
      state.merchantState = false;
    },
    setMerchantState(state, action) {
        state.merchantState = action.payload;
    },
    setEditProxy(state, action) {
        state.editProxy = action.payload;
    },
    emptyEditProxy(state, action) {
        state.editProxy = {};
    },
    setAllProxy(state, action) {
        state.allProxy = action.payload;
        state.proxyState = false;
      },
    setProxyState(state, action) {
        state.proxyState = action.payload;
    },
  },
});

export const permissionReducerActions = permissionSlice.actions;
export default permissionSlice;