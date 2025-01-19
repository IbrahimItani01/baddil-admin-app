import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { Location } from "../../../store/slices/locations.slice";

// Helper to retrieve auth token from local storage
const getAuthToken = () => localStorage.getItem("token");

// Create a new location
export const createLocation = async (
	locationData: Location
): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.post(
			`${APIS_BASE_URL}/locations/create`,
			locationData,
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

// Fetch location by ID
export const getLocationById = async (id: string): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${APIS_BASE_URL}/locations/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch {
		return false;
	}
};

// Fetch all locations
export const getAllLocations = async (): Promise<Location[] | false> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${APIS_BASE_URL}/locations`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch {
		return false;
	}
};
