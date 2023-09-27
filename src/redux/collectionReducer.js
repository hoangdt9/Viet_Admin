import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGates,
  addGate,
  modifyGate,
  deleteGate,
  getAllTransactions,
  getAllScreenshots,
  setTransIdInScreenshot,
  removeTransIdInScreenshot
} from "../services/collection/receipt";
import {
  addLabel,
  deleteLabel,
  getAllLabels,
  getCollections,
  addCollection,
  modifyCollection,
  changeState,
  changeClassification,
  changeCrawlerStatus,
  deleteCollectionCard,
} from "../services/collection/bankCard";

export const collectionSlice = createSlice({
  name: "authentication",
  initialState: {
    gates: [],
    collections: [],
    labels: [],
    success: true,
    transactions: [],
    screenshots: []
  },
  reducers: {
    getGates: (state, action) => {
      state.gates = action.payload.gates;
      state.success = action.payload.success;
    },
    initSuccess: (state, action) => {
      state.success = action.payload;
    },
    getLabels: (state, action) => {
      state.labels = action.payload;
    },
    getCollectionsData: (state, action) => {
      state.collections = action.payload;
    },
    setTransaction: (state, action) => {
      state.transactions = action.payload;
    },
    setScreeshots: (state, action) => {
      state.screenshots = action.payload;
    }
  },
});

export const { getGates, getLabels, getCollectionsData, initSuccess, setTransaction, setScreeshots } =
  collectionSlice.actions;

export const setSuccess = (flag) => (dispatch) => {
  dispatch(initSuccess(flag));
};

export const getGatesData = () => async (dispatch) => {
  const gates = await getAllGates();
  dispatch(getGates(gates));
};

export const addNewGate = (newGate) => async (dispatch) => {
  // newGate.payment_method = newGate.payment_method[0];
  const res = await addGate(newGate);
  if (res.success) dispatch(initSuccess(true));
};

export const editGate = (newGate) => async (dispatch) => {
  // newGate.payment_method = newGate.payment_method[0];
  const res = await modifyGate(newGate);
  if (res.success) dispatch(initSuccess(true));
};

export const removeGate = (id) => async (dispatch) => {
  const res = await deleteGate(id);
  if (res.success) dispatch(initSuccess(true));
};

export const getLabelsData = () => async (dispatch) => {
  try {
    const res = await getAllLabels();
    dispatch(getLabels(res.labels));
  } catch (e) {}
};

export const addNewLabel = (newLabel) => async (dispatch) => {
  try {
    const res = await addLabel(newLabel);
    if (res.success) dispatch(initSuccess(true));
  } catch (e) {}
};

export const removeLabel = (id) => async (dispatch) => {
  try {
    const res = await deleteLabel(id);
    if (res.success) dispatch(initSuccess(true));
  } catch (e) {}
};

// getCollectionCards
export const getCollectionCards = (cardType) => async (dispatch) => {
  try {
    const collections = await getCollections(cardType);
    if (collections.success) dispatch(getCollectionsData(collections?.cards));
  } catch (e) {}
};

// addCollection
export const addCollectionCard = (collection, cardType) => async (dispatch) => {
  try {
    const res = await addCollection({
      ...collection,
      cardType,
    });
    if (res.success) dispatch(initSuccess(true));
  } catch (e) {}
};

// modifyCollection
export const modifyCollectionCard = (collection) => async (dispatch) => {
  try {
    const res = await modifyCollection(collection);
    if (res.success) dispatch(initSuccess(true));
  } catch (e) {}
};

// changeState
export const changeCardState = (id, state) => async (dispatch) => {
  const res = await changeState(id, state);
  if (res.success) dispatch(initSuccess(true));
};

export const changeCardClassification =
  (cardType, classification) => async (dispatch) => {
    dispatch(initSuccess(false));
    const res = await changeClassification(cardType, classification);
    dispatch(getCollectionsData(res?.cards));
  };

export const changeCardCrawlerStatus =
  (id, crawlerStatus) => async (dispatch) => {
    const res = await changeCrawlerStatus(id, crawlerStatus);
    if (res.success) dispatch(initSuccess(true));
  };

export const deleteCardCollection = (id) => async (dispatch) => {
  const res = await deleteCollectionCard(id);
  if (res.success) dispatch(initSuccess(true));
};

export const getAllTransactionsRequest = () => async (dispatch) => {
  try {
    const res = await getAllTransactions();
    if (res.success)
      dispatch(setTransaction(res?.transactions));
  } catch (e) {
    console.log(e);
  }
} 

export const getAllScreenshotsRequest = () => async (dispatch) => {
  try {
    const res = await getAllScreenshots();
    if (res.success)
      dispatch(setScreeshots(res?.screenshots));
  } catch (e) {
    console.log(e);
  }
} 

export const setTransIdInScreenshotRequest = (data) => async (dispatch) => {
  try {
    console.log("KJH data:", data);
    const res = await setTransIdInScreenshot(data);
    
  } catch (e) {
    console.log(e);
  }
} 

export const removeTransIdInScreenshotRequest = (data) => async (dispatch) => {
  try {
    const res = await removeTransIdInScreenshot(data);
    
  } catch (e) {
    console.log(e);
  }
} 

export default collectionSlice.reducer;
