import axios from "axios";
import { APIS_BASE_URL } from "../../main";

const getAuthToken = () => localStorage.getItem("token");

export const getUserBarters = async (userId?: string): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const url = userId
			? `${APIS_BASE_URL}/barters/by-user/${userId}`
			: `${APIS_BASE_URL}/barters/by-user`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching user barters:", error);
		return false;
	}
};

export const getAllBarters = async (): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.get(`${APIS_BASE_URL}/barters`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching all barters:", error);
		return false;
	}
};
