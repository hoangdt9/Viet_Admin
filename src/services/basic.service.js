import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const getBasicInfo = async () => {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    const response = await fetch(`${API_BASE}/user/getAdminLogs`, requestOptions);
    const logs = await handleResponse(response);

    return logs;
}

export const basicService = {
    getBasicInfo
}