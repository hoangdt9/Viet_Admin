import { authHeader, handleResponse } from "../utils";
import { API_BASE } from "../config/constants";

const registerRollOver = async (newRoll) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(newRoll),
  };

  const response = fetch(
    `${API_BASE}/collection/registRollOver`,
    requestOptions
  );
  return await handleResponse(response);
};

const getOnlineRollOver = async () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`${API_BASE}/collection/getRollOverByBanking`, requestOptions);

  return await handleResponse(response);
}

const getHandMoneyRollOver = async (collectionID) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`${API_BASE}/collection/getRollOverByCollectionId/${collectionID}`, requestOptions);
  return await handleResponse(response);
}

export const rollOverService = {
  registerRollOver,
  getOnlineRollOver,
  getHandMoneyRollOver,
};
