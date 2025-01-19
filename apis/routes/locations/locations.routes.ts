import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { Location } from "../../../store/slices/locations.slice";

export const createLocation = async (locationData: Location) => {
	try {
		const response = await axios.post(
			`${APIS_BASE_URL}/locations/create`,
			locationData
		);
		return response.data;
	} catch (error) {
		console.error("Error creating location:", error.response || error.message);
		throw error;
	}
};

export const getLocationById = async (id: string) => {
	try {
		const response = await axios.get(`${APIS_BASE_URL}/locations/${id}`);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching location by ID:",
			error.response || error.message
		);
		throw error;
	}
};

export const getAllLocations = async () => {
	try {
		const response = await axios.get(`${APIS_BASE_URL}/locations`);
		return response.data.data;
	} catch (error) {
		console.error(
			"Error fetching all locations:",
			error.response || error.message
		);
		throw error;
	}
};
