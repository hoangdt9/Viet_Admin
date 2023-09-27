import socketIO from 'socket.io-client'
const DEV_MODE = true;
export const API_URL = DEV_MODE === true ? "http://localhost:8001/" : "https://api-v3.citysports.vn/";
export const API_BASE = DEV_MODE === true ? "http://localhost:8001/api/v1/admin" : "https://api-v3.citysports.vn/api/v1/admin";
export const API_IMG = DEV_MODE === true ? "http://localhost:8001/images/" : "https://api-v3.citysports.vn/images/";

export const socket = socketIO(API_URL);