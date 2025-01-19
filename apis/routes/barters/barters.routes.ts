import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { Barter } from "../../../store/slices/barters.slice";

const getAuthToken = () => localStorage.getItem("token");

export const getUserBarters = async (
	userId?: string
): Promise<Barter[] | false> => {
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

		return response.data.data;
	} catch {
		return false;
	}
};

export const getAllBarters = async (): Promise<Barter[] | false> => {
	try {
		const token = getAuthToken();
		if (!token) return false;

		const response = await axios.get(`${APIS_BASE_URL}/barters`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data.data;
	} catch {
		return false;
	}
};
