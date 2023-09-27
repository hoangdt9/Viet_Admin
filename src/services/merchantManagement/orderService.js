import  { authHeader, handleResponse } from '../../utils';
import { API_BASE } from '../../config/constants';
import {
    merchantReducerActions
} from '../../redux/merchant/merchantReducer';

import {toast} from 'react-toastify'

const getAllOrders = () => async (dispatch) => {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    const response = await fetch(`${API_BASE}/order/getAllOrders`, requestOptions);
    const data = await handleResponse(response);
    if(data.success){
        toast.success("Success");
        dispatch(merchantReducerActions.setAllOrders(data.orders));
    }
    else{
        //toast
    }

}

const getOrders = (type) => async (dispatch) => {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    const response = await fetch(`${API_BASE}/order/getOrdersByStatus/${type}`, requestOptions);
    const data = await handleResponse(response);
    if(data.success){
        toast.success("Success")
        dispatch(merchantReducerActions.setOrders(data.orders));
    }
    else{
        //toast
    }

}

const getOrderInfo = () => async (dispatch) => {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    const response = await fetch(`${API_BASE}/order/getOrderInfo`, requestOptions);
    const data = await handleResponse(response);
    if(data.success){
        toast.success("Success")
        dispatch(merchantReducerActions.setAllCount(data.count));
    }
    else{
        //toast
    }

}

const getOrdersByPage = (sendData) => async (dispatch) => {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    const response = await fetch(`${API_BASE}/order/getOrdersByPage/${sendData.page}/${sendData.count}`, requestOptions);
    const data = await handleResponse(response);
    if(data.success){
        toast.success("Success")
        dispatch(merchantReducerActions.setAllOrders(data.orders));
    }
    else{
        //toast
    }
}

const requestOrder = async (orderId, refundedReason) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({
            orderId, refundedReason
        })
    };

    const response = await fetch(`${API_BASE}/order/requestRefund`, requestOptions);
    const data = await handleResponse(response);
    return data;
}

const modifyPaymentAmount = async (id, orderAmount) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({
            id, orderAmount
        })
    };

    const response = await fetch(`${API_BASE}/order/modifyPaymentAmount`, requestOptions);
    const data = await handleResponse(response);
    return data;
}

const getAllRefundingOrders = () => async (dispatch) => {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    const response = await fetch(`${API_BASE}/order/getAllRefundingOrders`, requestOptions);
    const data = await handleResponse(response);
    if(data.success){
        toast.success("Success")
        dispatch(merchantReducerActions.setRefundingLists(data.refundingOrders));
    }
    else{
        //toast
    }
    return data;
}

const orderService = {
    getAllOrders,
    getOrders,
    getOrderInfo,
    getOrdersByPage,
    requestOrder,
    modifyPaymentAmount,
    getAllRefundingOrders,
}

export default orderService;