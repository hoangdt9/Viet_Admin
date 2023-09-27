import  { authHeader, handleResponse } from '../../utils';
import { API_BASE } from '../../config/constants';

import { logReducerActions } from '../../redux/log/logReducer';

import { async } from 'q';

import {toast} from 'react-toastify'

const getOperationLog = (sendData) => async (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_BASE}/ipWhite/getOperationLogsByPage/${sendData.count}/${sendData.page}`,
    requestOptions
  );
  const data = await handleResponse(response);
  if (data.success) {
    toast.success("Success");
    dispatch(logReducerActions.setAllLogs(data.operationLogList))
  } else {
    //toast
  }
};

const getOperationInfo = () => async (dispatch) => {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
      };
    
      const response = await fetch(
        `${API_BASE}/ipWhite/getOperationLogsInfo`,
        requestOptions
      );
      const data = await handleResponse(response);
      if (data.success) {
        dispatch(logReducerActions.setAllCount(data.count));
      } else {
        //toast
      }
}

const deleteLog = async (id) => {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
      };
    
      const response = await fetch(
        `${API_BASE}/ipWhite/deleteOperationLog/${id}`,
        requestOptions
      );
      const data = await handleResponse(response);
      if (data.success) {
        toast.success("Success");
      } else {
        //toast
      }
      return data;
}

const deleteAdminOperationLog = async (id) => {
  const requestOptions = {
      method: "DELETE",
      headers: authHeader(),
    };
  
    const response = await fetch(
      `${API_BASE}/user/deleteAdminOperationLog/${id}`,
      requestOptions
    );
    const data = await handleResponse(response);
    if (data.success) {
      toast.success("Success");
    } else {
      //toast
    }
    return data;
}


const logService = {
    getOperationLog,
    getOperationInfo,
    deleteLog,
    deleteAdminOperationLog
};

export default logService   ;
