import  { authHeader, handleResponse } from '../../utils';
import { API_BASE } from '../../config/constants';

const setInnerFilling = async (sendData) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeader() },
            body: JSON.stringify(sendData),
        };
    
        const response = await fetch(
            `${API_BASE}/merchant/setInnerFilling`,
            requestOptions
        );
        return await handleResponse(response);
    } catch (e) {
        console.log(e)
    }
};

const getAllFillings = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: authHeader()
        };
    
        const response = await fetch(`${API_BASE}/merchant/getAllFillings`, requestOptions);
        const data = await handleResponse(response);
        return data;
    } catch (e) {

    }
}

const merchantService = {
    setInnerFilling,
    getAllFillings
}

export default merchantService;