import axios from "axios";
import { APIS_BASE_URL } from "../../../main"; 

const STATISTICS_ENDPOINT = `${APIS_BASE_URL}/statistics/user-count`;

export const fetchUserCounts = async () => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(STATISTICS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching user counts:", error.response?.data || error.message);
    throw error; 
  }
};
