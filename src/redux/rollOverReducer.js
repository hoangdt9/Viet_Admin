import { createSlice } from "@reduxjs/toolkit";
import { rollOverService } from "../services/rollover.service";

export const collectionSlice = createSlice({
  name: "authentication",
  initialState: {
    rollOver: {
      banking: ""
    },
    isSuccess: false
  },
  reducers: {
    getRollOver: (state, action) => {
        state.rollOver = action.payload;
    },
    setSuccess: (state, action) => {
        state.isSuccess = action.payload
    },
    setBanking: (state, action) => {
      state.rollOver.banking = action.payload;
    }
  },
});

export const { getRollOver, setSuccess, setBanking } = collectionSlice.actions;

export const registerRollOver = (newRoll) => async (dispatch) => {
    try {
        const res = await rollOverService.registerRollOver(newRoll);
        if(res.success) dispatch(getRollOver(res.rollOver ?? {}))
    } catch (e) {

    }
}

// getRollOverByBanking
export const getRollOverByBanking = () => async (dispatch) => {
  try {
    const res = await rollOverService.getOnlineRollOver();
    if(res.success) dispatch(getRollOver(res.rollOver ?? {}))
    return res;
  } catch (e) {}
};

// getRollOverByBanking
export const getRollOverByCollectionID = (collectionID) => async (dispatch) => {
    try {
      const res = await rollOverService.getHandMoneyRollOver(collectionID);
      if(res.success) dispatch(getRollOver(res.rollOver ?? {}))
      return res;
    } catch (e) {}
  };
  

export default collectionSlice.reducer;
