import axios from "axios";
import { APIS_BASE_URL } from "../../main";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export const checkUserByEmail = async (email: string): Promise<boolean | ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${APIS_BASE_URL}/users/check-email`, { email });
    return response.data;
  } catch (error) {
    console.error("Error checking user by email:", error);
    return false;
  }
};

export const serveUserProfileImage = async (): Promise<string | false> => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return false;
  try {
    const response = await axios.get<ApiResponse<string>>(`${APIS_BASE_URL}/users/profile-picture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.success ? response.data.data : false;
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return false;
  }
};

export const getUserInfo = async (): Promise<unknown | null> => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;
  try {
    const response = await axios.get<ApiResponse>(`${APIS_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export const changeProfilePicture = async (formData: FormData): Promise<ApiResponse | false> => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return false;
  try {
    const response = await axios.put<ApiResponse>(`${APIS_BASE_URL}/users/me/profile-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error changing profile picture:", error);
    return false;
  }
};

export const updateUserInfo = async (updateData: Record<string, unknown>): Promise<ApiResponse | false> => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return false;
  try {
    const response = await axios.put<ApiResponse>(`${APIS_BASE_URL}/users/me`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user information:", error);
    return false;
  }
};
