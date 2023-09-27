import { createSlice } from "@reduxjs/toolkit";
import { settlementService } from "../services/settlement.service.js";
import { openSnackBar } from "../snackBarReducer.js";

export const settlementSlice = createSlice({
  name: "settlementList",
  initialState: {
    loading: false,
    orderData: [],
    debitCards: [],
  },
  reducers: {
    settlementRequest: (state) => {
      state.loading = true;
    },
    settlementSuccess: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.orderData = action.payload;
    },
    settlementFailure: (state) => {
      state.loading = false;
    },
    getDebitCards: (state, action) => {
      state.debitCards = action.payload;
    },
  },
});

const {
  settlementRequest,
  settlementSuccess,
  settlementFailure,
  getDebitCards,
} = settlementSlice.actions;

export const getAllOrders = () => async (dispatch) => {
  dispatch(settlementRequest());
  try {
    const orderData = await settlementService.getAllOrders();
    console.log("orderData", orderData);
    dispatch(settlementSuccess(orderData));
    return orderData;
  } catch (error) {
    dispatch(settlementFailure());
    dispatch(openSnackBar({ message: error.message, status: "error" }));
    // throw new Error(error);
  }
};

export const getDevitCards = () => async (dispatch) => {
  dispatch(settlementRequest());
  try {
    const debitData = await settlementService.getAvailableDebitCards();
    console.log("debitData", debitData);
    if (debitData?.success)
      {
        let temp = debitData?.debitCards?.filter((card) => card.paymentRobot === "turn on");
        dispatch( getDebitCards([...temp]));}
  } catch (error) {
    dispatch(settlementFailure());
    dispatch(openSnackBar({ message: error.message, status: "error" }));
    // throw new Error(error);
  }
};


export default settlementSlice.reducer;
