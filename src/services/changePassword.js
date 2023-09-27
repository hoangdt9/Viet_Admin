import { authHeader, handleResponse } from "../utils";
import { API_BASE } from "../config/constants";

const changePassword = async (newPwd) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(newPwd),
    };

    const response = fetch(`${API_BASE}/auth/changePassword`, requestOptions);
    return await handleResponse(response);
  } catch (e) {
    console.log(e);
  }
};

export const authService = {
  changePassword,
};
