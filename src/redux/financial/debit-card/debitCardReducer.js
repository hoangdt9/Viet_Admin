import { createSlice } from "@reduxjs/toolkit";
import { debitCardService } from '../../../services/financial/debit-card/debitCard.service';
import { openSnackBar } from "../../snackBarReducer";

import {toast} from 'react-toastify';


export const debitCardSlice = createSlice({
    name: "debit-card",
    initialState:{
        addingCard: false,
        addedCard: true,
        debitCardsInfo: {},
        getCardState : true
    },
    reducers:{
      // Add DebitCard
        addDebitCardRequest: state => {
            state.addingCard = true;
            state.addedCard = false;
        },
        addDebitCardSuccess: (state, action) => {
            state.addingCard = false;
            state.addedCard = true;
            // state.debitCardsInfo = action.payload;
        },
        addDebitCardFailure : state => {  
            state.addingCard = false;
            state.addedCard = false
        },
        // Get Cards Info
        getDebitCardsRequest: state => {
          state.addingCard = true
        },
        getDebitCardsSuccess: (state, action) => {
            state.addingCard = false;
            state.addedCard = true;
            state.debitCardsInfo = action.payload;
        },
        getDebitCardsFailure : state => {
            state.addingCard = false;
            state.addedCard = false
        },
        // Update debit card
        updateDebitCardRequest: state => {
          state.addingCard = true;
          state.addedCard = false;
        },
        updateDebitCardSuccess: (state, action) => {
            state.addingCard = false;
            state.addedCard = true;
            // state.debitCardsInfo = action.payload;
        },
        updateDebitCardFailure : state => {
            state.addingCard = false;
            state.addedCard = false
        },
        // Change Robot Payment
        changeRobotRequest: state => {
          state.addingCard = true;
          state.addedCard = false;
        },
        changeRobotSuccess: (state, action) => {
            state.addingCard = false;
            state.addedCard = true;
            // state.debitCardsInfo = action.payload;
        },
        changeRobotFailure : state => {
            state.addingCard = false;
            state.addedCard = false
        },
        // Search Debit Card
        searchDebitCardRequest: state => {
          state.addingCard = true;
          // state.addedCard = false;
        },
        searchDebitCardSuccess: (state, action) => {
            state.addingCard = false;
            // state.addedCard = true;
            state.debitCardsInfo = action.payload;
        },
        searchDebitCardFailure : state => {
            state.addingCard = false;
            state.addedCard = false
        },
        // Delete Debit Card
        deleteDebitCardRequest: state => {
          state.addingCard = true;
          state.addedCard = false;
        },
        deleteDebitCardSuccess: (state, action) => {
            state.addingCard = false;
            state.addedCard = true;
            // state.debitCardsInfo = action.payload;
        },
        deleteDebitCardFailure : state => {
            state.addingCard = false;
            state.addedCard = false
        },
        setGetAddState : (state, action) => {
          state.getCardState = action.payload;
        }
    }
});

const {  addDebitCardRequest, addDebitCardSuccess, addDebitCardFailure, getDebitCardsRequest, getDebitCardsSuccess, getDebitCardsFailure, updateDebitCardRequest, updateDebitCardSuccess, updateDebitCardFailure, changeRobotRequest, changeRobotSuccess, changeRobotFailure, searchDebitCardRequest, searchDebitCardSuccess, searchDebitCardFailure, deleteDebitCardRequest, deleteDebitCardSuccess, deleteDebitCardFailure, setGetAddState } = debitCardSlice.actions;
// Add Debit Card
export const addDebitCard = (data) => async (dispatch) => {
    console.log(data);
  dispatch(addDebitCardRequest());
    console.log("addDebitCard");
  try {
    const debitCardInfo = await debitCardService.addDebitCard(data);
    console.log("debitCardInfo",debitCardInfo);

    dispatch(addDebitCardSuccess(debitCardInfo));
  } catch (error) {
    dispatch(addDebitCardFailure());
    dispatch(openSnackBar({ message: error.message, status: "error" }));
    throw new Error(error);
  }
};
// Update Debit Card
export const updateDebitCard = (data) => async (dispatch) => {
  console.log(data);
dispatch(updateDebitCardRequest());
  console.log("updateDebitCard");
try {
  const debitCardInfo = await debitCardService.updateDebitCard(data);
  console.log("debitCardInfo",debitCardInfo);

  dispatch(updateDebitCardSuccess(debitCardInfo));
  if(debitCardInfo.success){
    dispatch(setGetAddState(true));
  }
} catch (error) {
  dispatch(updateDebitCardFailure());
  dispatch(openSnackBar({ message: error.message, status: "error" }));
  throw new Error(error);
}
};

// Get Debit Cards Info
export const getDebitCardsInfo = () => async (dispatch) => {
  console.log("getDebitCardInfo");
dispatch(getDebitCardsRequest());
try {
  const debitCardsInfo = await debitCardService.getDebitCards();
  console.log("debitCardInfo",debitCardsInfo);

  dispatch(getDebitCardsSuccess(debitCardsInfo));
  dispatch(setGetAddState(false));
} catch (error) {
  dispatch(getDebitCardsFailure());
  dispatch(openSnackBar({ message: error.message, status: "error" }));
  throw new Error(error);
}
};

// Update Debit Card
export const changeRobot = (data) => async (dispatch) => {
  console.log(data);
dispatch(changeRobotRequest());
  console.log("changeRobot");
try {
  const debitCardInfo = await debitCardService.changeRobot(data);
  console.log("debitCardInfo",debitCardInfo);

  dispatch(changeRobotSuccess(debitCardInfo));
} catch (error) {
  dispatch(changeRobotFailure());
  dispatch(openSnackBar({ message: error.message, status: "error" }));
  throw new Error(error);
}
};
// Search Debit Card
export const searchDebitCard = (data) => async (dispatch) => {
  console.log(data);
dispatch(searchDebitCardRequest(data));
try {
  const debitCardInfo = await debitCardService.searchDebitCard(data);
  console.log("debitCardInfo",debitCardInfo);

  dispatch(searchDebitCardSuccess(debitCardInfo));
} catch (error) {
  dispatch(searchDebitCardFailure());
  dispatch(openSnackBar({ message: error.message, status: "error" }));
  throw new Error(error);
}
};
// Delete Debit Card
export const deleteDebitCard = (data) => async (dispatch) => {
  console.log(data);
dispatch(deleteDebitCardRequest(data));
  console.log("changeRobot");
try {
  const debitCardInfo = await debitCardService.deleteDebitCard(data);
  
  dispatch(deleteDebitCardSuccess(debitCardInfo));
  if(debitCardInfo.success){
    dispatch(setGetAddState(true));
  }
} catch (error) {
  dispatch(deleteDebitCardFailure());
  dispatch(openSnackBar({ message: error.message, status: "error" }));
  throw new Error(error);
}
};

export const transferBetDebitCards = (data) => async (dispatch) => {
  console.log(data);
  const res = await debitCardService.transferBetDebitCards(data);
  if(res.success){
    toast.success("Success");
  }
  else{
    alert("failed");
  }
}

export const getAllDebitCardTransferLog = () => async (dispatch) => {
  console.log("getDebitCardInfo");
  dispatch(getDebitCardsRequest());
  try {
    const debitCardsInfo = await debitCardService.getAllDebitCardTransferLog();
    console.log("debitCardInfo",debitCardsInfo);
  
    dispatch(getDebitCardsSuccess(debitCardsInfo));
    dispatch(setGetAddState(false));
  } catch (error) {
    dispatch(getDebitCardsFailure());
    dispatch(openSnackBar({ message: error.message, status: "error" }));
    throw new Error(error);
  }
}

export default debitCardSlice.reducer;