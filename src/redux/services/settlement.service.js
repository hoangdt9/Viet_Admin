import { authHeader, handleResponse } from "../../utils/index";
import { API_BASE } from "../../config/constants";

const getAllOrders = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${API_BASE}/order/getAllOrders`);
  const testInfo = await handleResponse(response);

  return testInfo;
};

// Get all debit cards info
const getAvailableDebitCards = async () => {
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

const setWithDrwalSetting = async (data) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(
    `${API_BASE}/debitCard/setWithDrawalSetting`,
    requestOptions
  );
  return await handleResponse(response);
};

export const settlementService = {
  getAllOrders,
  getAvailableDebitCards,
  setWithDrwalSetting,
};
