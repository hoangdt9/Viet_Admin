import { authHeader, handleResponse } from "../../utils";
import { API_BASE } from "../../config/constants";

// response
// {success: true, gates}
export const getAllLabels = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${API_BASE}/collection/getAllLabels`,
    requestOptions
  );
  return await handleResponse(response);
};
// caption, color
export const addLabel = async (label) => {
  const requestOptions = {
    method: "Put",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ...label }),
  };
  const response = await fetch(
    `${API_BASE}/collection/addLabel`,
    requestOptions
  );
  return await handleResponse(response);
};

// caption, color
export const deleteLabel = async (id) => {
  const requestOptions = {
    method: "Delete",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/deleteLabel/${id}`,
    requestOptions
  );
  return await handleResponse(response);
};

// getCollectionsByType
export const getCollections = async (cardType) => {
  const requestOptions = {
    method: "Get",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/getAllCollectionCardsByType/${cardType}`,
    requestOptions
  );
  return await handleResponse(response);
};

// getCollectionsByType
//  name, type, paymentType, accountNumber, cardType
export const addCollection = async (collection) => {
  const requestOptions = {
    method: "Put",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ...collection }),
  };
  const response = await fetch(
    `${API_BASE}/collection/addCollectionCard`,
    requestOptions
  );
  return await handleResponse(response);
};

// modifyCollectionCard
// deviceID, ordinalValue, dailyReceivingLimit, dailyMaxPayment,
// state, classification, weights, crawlerStatus

export const modifyCollection = async (collection) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ...collection }),
  };
  const response = await fetch(
    `${API_BASE}/collection/modifyCollectionCard`,
    requestOptions
  );
  return await handleResponse(response);
};

// changeState

export const changeState = async (id, state) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ id, state }),
  };
  const response = await fetch(
    `${API_BASE}/collection/changeState`,
    requestOptions
  );
  return await handleResponse(response);
};

// changeClassification
export const changeClassification = async (cardType, classification) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ cardType, classification }),
  };
  const response = await fetch(
    `${API_BASE}/collection/searchByClassification`,
    requestOptions
  );
  return await handleResponse(response);
};

// changeCrawlerStatus
export const changeCrawlerStatus = async (id, crawlerStatus) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ id, crawlerStatus }),
  };
  const response = await fetch(
    `${API_BASE}/collection/changeCrawlerStatus`,
    requestOptions
  );
  return await handleResponse(response);
};

// deleteCollectionCard
export const deleteCollectionCard = async (id) => {
  const requestOptions = {
    method: "Delete",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/deleteCollectionCard/${id}`,
    requestOptions
  );
  return await handleResponse(response);
};


export const saveRestrictMerchants = async (id, restrictMerchants) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ id, restrictMerchants }),
  };
  const response = await fetch(
    `${API_BASE}/collection/saveRestrictMerchants`,
    requestOptions
  );
  return await handleResponse(response);
};