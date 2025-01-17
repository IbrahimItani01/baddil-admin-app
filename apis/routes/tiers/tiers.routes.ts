import axios from "axios";
import { APIS_BASE_URL } from "../../main";

const getAuthToken = () => localStorage.getItem("token");

export const createTier = async (tierData: unknown): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.post(`${APIS_BASE_URL}/tiers`, tierData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error creating tier:", error);
		return false;
	}
};

export const getTiers = async (): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.get(`${APIS_BASE_URL}/tiers`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching tiers:", error);
		return false;
	}
};

export const updateTier = async (
	id: string,
	updateData: unknown
): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.put(
			`${APIS_BASE_URL}/tiers/${id}`,
			updateData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error updating tier:", error);
		return false;
	}
};

export const deleteTier = async (id: string): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.delete(`${APIS_BASE_URL}/tiers/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error deleting tier:", error);
		return false;
	}
};
