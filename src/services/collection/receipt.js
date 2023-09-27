import { authHeader, handleResponse } from "../../utils";
import { API_BASE } from "../../config/constants";

// response
// {success: true, gates}
export const getAllGates = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${API_BASE}/collection/getAllGates`,
    requestOptions
  );
  return await handleResponse(response);
};
// channel, merchants, payment_device, collection_area, payment_method, collection_time_from, collection_time_to, probability, delayed_collection, gps_matching
export const addGate = async (gate) => {
  const requestOptions = {
    method: "Put",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ...gate }),
  };
  const response = await fetch(
    `${API_BASE}/collection/addGate`,
    requestOptions
  );
  return await handleResponse(response);
};

// id, channel, merchants, payment_device, collection_area, payment_method, collection_time_from, collection_time_to, probability, delayed_collection, gps_matching

export const modifyGate = async (gate) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ...gate }),
  };
  console.log(gate);
  const response = await fetch(
    `${API_BASE}/collection/modifyGate`,
    requestOptions
  );
  return await handleResponse(response);
};

export const deleteGate = async (id) => {
  const requestOptions = {
    method: "Delete",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/deleteGate/${id}`,
    requestOptions
  );
  return await handleResponse(response);
};

export const getAllTransactions = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/getAllTransactions`,
    requestOptions
  );
  return await handleResponse(response);
};

export const getAllScreenshots = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  const response = await fetch(
    `${API_BASE}/collection/getAllScreenshots`,
    requestOptions
  );
  return await handleResponse(response);
}

export const setTransIdInScreenshot = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data)
  };
  const response = await fetch(
    `${API_BASE}/collection/setTransIdInScreenshot`,
    requestOptions
  );
  return await handleResponse(response);
}

export const removeTransIdInScreenshot = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data)
  };
  const response = await fetch(
    `${API_BASE}/collection/removeTransIdInScreenshot`,
    requestOptions
  );
  return await handleResponse(response);
}