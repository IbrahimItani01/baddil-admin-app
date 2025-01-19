import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { Tier } from "../../../store/slices/tiers.slice";

// Helper to retrieve auth token from local storage
const getAuthToken = () => localStorage.getItem("token");

// Create a new tier
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
	} catch {
		return false;
	}
};

// Fetch all tiers
export const getTiers = async (): Promise<Tier[] | false> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${APIS_BASE_URL}/tiers`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch {
		return false;
	}
};

// Update a tier by ID
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
	} catch {
		return false;
	}
};

// Delete a tier by ID
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
	} catch {
		return false;
	}
};
