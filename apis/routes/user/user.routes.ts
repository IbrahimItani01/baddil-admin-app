import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { User } from "../../../store/slices/users.slice";
import { UserResponse } from "../../../src/components/base/MeetupVerify";

// Check if a user exists by email
export const checkUserByEmail = async (email: string): Promise<UserResponse | null> => {
	try {
	  const response = await axios.post(`${APIS_BASE_URL}/users/check-email`, {
		email,
	  });
	  return response.data.data as UserResponse;  // Explicitly cast to UserResponse
	} catch {
	  return null;
	}
  };
  

// Get the user's profile picture URL
export const serveUserProfileImage = async (): Promise<
	string | boolean | undefined
> => {
	try {
		const token = localStorage.getItem("jwtToken");
		if (!token) return;
		const response = await axios.get(`${APIS_BASE_URL}/users/profile-picture`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.success ? response.data.data : false;
	} catch {
		return false;
	}
};

// Fetch user information
export const getUserInfo = async (): Promise<unknown | undefined> => {
	try {
		const token = localStorage.getItem("jwtToken");
		if (!token) return false;
		const response = await axios.get(`${APIS_BASE_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.success ? response.data.data : false;
	} catch {
		return false;
	}
};

// Change the user's profile picture
export const changeProfilePicture = async (
	formData: FormData
): Promise<unknown> => {
	try {
		const token = localStorage.getItem("jwtToken");
		if (!token) return false;
		const response = await axios.put(
			`${APIS_BASE_URL}/users/me/profile-picture`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	} catch {
		return false;
	}
};

// Update user information
export const updateUserInfo = async (updateData: unknown): Promise<unknown> => {
	try {
		const token = localStorage.getItem("jwtToken");
		if (!token) return false;
		const response = await axios.put(`${APIS_BASE_URL}/users/me`, updateData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch {
		return false;
	}
};

// Fetch users grouped by type
export const fetchUsersByType = async (): Promise<Record<string, User[]>> => {
	try {
		const token = localStorage.getItem("jwtToken");
		if (!token) return {};
		const response = await axios.get(`${APIS_BASE_URL}/users/users-by-type`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.success ? response.data.data : {};
	} catch {
		return {};
	}
};
