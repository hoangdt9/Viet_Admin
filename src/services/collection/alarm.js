import { authHeader, handleResponse } from "../../utils";
import { API_BASE } from "../../config/constants";

// id, alarmStdValue
export const setAlarm = async (id, alarmStatus, alarmStdValue) => {
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ id, alarmStdValue, alarmStatus }),
  };
  const response = await fetch(
    `${API_BASE}/collection/setAlarm`,
    requestOptions
  );
  return await handleResponse(response);
};

