import { createSlice } from "@reduxjs/toolkit";
import { testService } from '../services/test.service'
import { openSnackBar } from "./snackBarReducer";


export const testSlice = createSlice({
    name: "testPayment",
    initialState:{
        testing: false,
        testInfo: {},
    },
    reducers:{
        testRequest: state => {
            state.testing = true
        },
        testSuccess: (state, action) => {
            console.log(action.payload);
            state.testing = false;
            state.testInfo = action.payload;
        },
        testFailure : state => {
            state.testing = false;
        },
    }
});

const { testRequest, testSuccess, testFailure } = testSlice.actions;

export const testUser = (data) => async (dispatch) => {
  dispatch(testRequest());
  try {
    const testInfo = await testService.testPayment(data);
    console.log("testInfo", testInfo);
    dispatch(testSuccess(testInfo));
    return testInfo;
  } catch (error) {
    dispatch(testFailure());
    dispatch(openSnackBar({ message: error.message, status: "error" }));
    // throw new Error(error);
  }
};

export const getAllMerchants = () => async (dispatch) => {
  
}
export default testSlice.reducer;