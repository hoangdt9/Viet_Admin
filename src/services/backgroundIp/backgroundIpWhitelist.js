import  { authHeader, handleResponse } from '../../utils';
import { API_BASE } from '../../config/constants';
import { backgroundReducerActions } from '../../redux/background/backgroundRedux';
import { async } from 'q';

import {toast} from 'react-toastify'

const getAllIpAddress = () => async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
  
    const response = await fetch(
      `${API_BASE}/ipWhite/getIpWhiteAddressList`,
      requestOptions
    );
    const data = await handleResponse(response);
    if (data.success) {
        dispatch(backgroundReducerActions.setAllIpAddress(data.ipWhiteAddressList));
    } else {
      //toast
    }
};

const postIpAddress = (sendData) => async (dispatch) => {

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(sendData),
    };
    
      const response = await fetch(
        `${API_BASE}/ipWhite/addIpWhiteAddress`,
        requestOptions
      );
      const data = await handleResponse(response);
      if (data.success) {
        toast.success("Success");
          dispatch(backgroundReducerActions.setIpState(true));
      } else {
        //toast
      }
}

const backgroundIpWhitelistService = {
    getAllIpAddress,
    postIpAddress
  };
  
  export default backgroundIpWhitelistService;