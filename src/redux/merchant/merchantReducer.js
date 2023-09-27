import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  allOrders: [],
  orders : [],
  count : 10,
  page : 1,
  allCount : 0,
  merchants: [],
  reload: true,
  refundingLists: []
};

const merchantSlice = createSlice({
  name: "merchantSlice",
  initialState: initialOrderState,
  reducers: {
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
    setOrders(state, action) {
        state.orders = action.payload;
    },
    setAllCount(state, action) {
        state.allCount = action.payload;
    },
    setMerchants : (state, action) => {
      state.merchants = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setRefundingLists: (state, action) => {
      state.refundingLists = action.payload;
    }
  },
});

// export const getAllOrders = () => async (dispatch) => {
//   dispatch(settlementRequest());
//   try {
//     const orderData = await settlementService.getAllOrders();
//     console.log("orderData", orderData);
//     dispatch(settlementSuccess(orderData));
//     return orderData;
//   } catch (error) {
//     dispatch(settlementFailure());
//     dispatch(openSnackBar({ message: error.message, status: "error" }));
//     // throw new Error(error);
//   }
// };

export const merchantReducerActions = merchantSlice.actions;
export default merchantSlice;