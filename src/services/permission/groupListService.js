import  { authHeader, handleResponse } from '../../utils';
import { API_BASE } from '../../config/constants';
import {
    permissionReducerActions
} from '../../redux/permission/permissionReducer';

import { toast } from 'react-toastify';

const getMerchants = () => async (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/merchant/getAllMerchants`,
    requestOptions
  );
  const data = await handleResponse(response);
  if (data.success) {
    dispatch(permissionReducerActions.setAllMerchant(data.merchants));
    dispatch(permissionReducerActions.setMerchantState(false));
  } else {
    //toast
  }
};

const modifyMerchant = (sendData) => async (dispatch) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(sendData),
    };

  const response = await fetch(
    `${API_BASE}/merchant/modifyMerchant`,
    requestOptions
  );
  const data = await handleResponse(response);

  if (data.success) {
    toast.success("Modify success");
    dispatch(permissionReducerActions.setEditMerchant(data.merchant));
  } else {
    //toast
  }
};

const registerMerchant = async (sendData) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(sendData),
    };

  const response = await fetch(
    `${API_BASE}/merchant/registMerchant`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Register success");
  }

  return data;
};

const deleteMerchant = (id) => async (dispatch) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/merchant/deleteMerchant/${id}`,
    requestOptions
  );
  const data = await handleResponse(response);
  if (data.success) {
    toast.success("Delete success");
    dispatch(permissionReducerActions.setMerchantState(true));
  } else {
    //toast
  }

  return data;
};

const getAllProxies = () => async (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/proxy/getAllProxies`,
    requestOptions
  );
  const data = await handleResponse(response);

  if (data.success) {
    dispatch(permissionReducerActions.setAllProxy(data.proxies));
    dispatch(permissionReducerActions.setProxyState(false));
  } else {
    //toast
  }
};

const addProxy = async (sendData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };
  const response = await fetch(`${API_BASE}/proxy/addProxy`, requestOptions);
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Add proxy success");
  }
  return data;
};

const getEditProxy = (id) => async (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/proxy/getProxyInfoById/${id}`,
    requestOptions
  );
  const data = await handleResponse(response);

  if (data.success) {
    dispatch(permissionReducerActions.setEditProxy(data.proxy));
  } else {
    //toast
  }
};

const changeMembersInProxy = (sendData) => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/changeMembersInProxy`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Change Members in Proxy success");
  }
  return data;
};

const deleteProxy = (id) => async (dispatch) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/proxy/deleteProxy/${id}`,
    requestOptions
  );
  const data = await handleResponse(response);

  if (data.success) {
    toast.success("Delete Proxy success");
    dispatch(permissionReducerActions.setProxyState(true));
  } else {
    //toast
  }
};

const addMerchantInProxy = (sendData) => async (dispatch) => {

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/addMerchantInProxy`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    dispatch(getEditProxy(sendData.proxyId));
    toast.success("Add Merchant in proxy success");
  }
  return data;
};

const addChannelInProxy = async (sendData) => {

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/addChannelInProxy`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Add Channel in proxy success");
  }
  return data;
};

const changeProxyState = async (sendData) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/changeProxyState`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Change proxy state success");
  }
  return data;
};

const changeMerchantInproxy = (sendData) => async (dispatch) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/changeMerchantInproxy`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Chage Merchant in proxy success");
  }
  return data;
};

const modifyAccountInProxy = async (sendData) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `${API_BASE}/proxy/modifyAccountInProxy`,
    requestOptions
  );
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Modify Account in proxy success");
  }
  return data;
};

const addRateInProxy = async (sendData) => {

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(sendData),
  };
  const response = await fetch(
    `${API_BASE}/proxy/addRateInProxy`,
    requestOptions
  );
  
  const data = await handleResponse(response);
  if(data.success){
    toast.success("Add rate in proxy success");
  }
  else {
    toast.warning(data?.msg);
  }
  return data;
};

const groupListService = {
  getMerchants,
  modifyMerchant,
  registerMerchant,
  deleteMerchant,
  getAllProxies,
  addProxy,
  changeMembersInProxy,
  deleteProxy,
  getEditProxy,
  addMerchantInProxy,
  addChannelInProxy,
  changeProxyState,
  changeMerchantInproxy,
  modifyAccountInProxy,
  addRateInProxy
};

export default groupListService;
