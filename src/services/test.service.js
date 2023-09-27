import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const testPayment = async ({merchantId, orderAmount, payMethod, notifyUrl, backUrl, bankCode, bankAccountName, bankMemo, is_revise_wrong_amount}) => {
    console.log(typeof(orderAmount));
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({merchantId, orderAmount, payMethod, notifyUrl, backUrl, bankCode, bankAccountName, bankMemo, is_revise_wrong_amount})
    };
    console.log("requestOptions", requestOptions);
    const response = await fetch(`${API_BASE}/order/addOrder`, requestOptions);
    const testInfo = await handleResponse(response);

    return testInfo;
}

export const testService = {
    testPayment,
}