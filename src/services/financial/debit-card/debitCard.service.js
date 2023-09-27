import { authHeader, handleResponse } from "../../../utils";
import { API_BASE } from "../../../config/constants";

const addDebitCard = async ({ name, bankName, bankAccount }) => {
  console.log(name);
  console.log(bankName);
  console.log(bankAccount);
  const sendData = { name, bankName, bankAccount };
  console.log(sendData);
  const requestOptions = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(`${API_BASE}/debitCard/addCard`, requestOptions);
  return await handleResponse(response);
};
// Get all debit cards info
const getDebitCards = async () => {
  const requestOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${API_BASE}/debitCard/getAllCards`,
    requestOptions
  );
  console.log("getDebitCardsInfo", response);
  return await handleResponse(response);
};
// Update a specific debit card info
const updateDebitCard = async ({ id, name, bankName, bankAccount, amount, handlingFee }) => {
  const sendData = { id, name, bankName, bankAccount, amount, handlingFee };
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(
    `${API_BASE}/debitCard/modifyTransferLog`,
    requestOptions
  );
  return await handleResponse(response);
};
// Change robot payment
const changeRobot = async ({ id, paymentRobot }) => {
  const sendData = { id, paymentRobot };
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(
    `${API_BASE}/debitCard/changePaymentRobot`,
    requestOptions
  );
  return await handleResponse(response);
};
// Change robot payment
const searchDebitCard = async (data) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(`${API_BASE}/debitCard/search`, requestOptions);
  return await handleResponse(response);
};
// Change robot payment
const deleteDebitCard = async ({ id }) => {
  console.log(id);
  const requestOptions = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(
    `${API_BASE}/debitCard/deleteTransferLog/${id}`,
    requestOptions
  );
  return await handleResponse(response);
};

const changeBalance = async (id, balance) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, balance }),
  };
  const response = await fetch(
    `${API_BASE}/debitCard/changeBalance`,
    requestOptions
  );
  return await handleResponse(response);
};

const changeSequence = async (selectedCardId, willChangeCardId) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedCardId, willChangeCardId }),
  };
  const response = await fetch(
    `${API_BASE}/debitCard/changeSequence`,
    requestOptions
  );
  return await handleResponse(response);
};

const transferBetDebitCards = async (data) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${API_BASE}/debitCard/transferBetDebitCards`,
    requestOptions
  );
  return await handleResponse(response);
}

const getAllDebitCardTransferLog = async () => {
  const requestOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${API_BASE}/debitCard/getAllDebitCardTransferLog`,
    requestOptions
  );
  console.log("getDebitCardsInfo", response);
  return await handleResponse(response);
}

const changeCheckedCardRequest = async (data) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${API_BASE}/debitCard/changeCheckedCard`,
    requestOptions
  );
  return await handleResponse(response);
}

export const debitCardService = {
  addDebitCard,
  getDebitCards,
  updateDebitCard,
  changeRobot,
  searchDebitCard,
  deleteDebitCard,
  changeBalance,
  changeSequence,
  transferBetDebitCards,
  getAllDebitCardTransferLog,
  changeCheckedCardRequest
};
