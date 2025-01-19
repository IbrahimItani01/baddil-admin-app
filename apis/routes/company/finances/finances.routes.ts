import axios from "axios";
import { APIS_BASE_URL } from "../../../main"; // Ensure this contains your base API URL

const FINANCES_ENDPOINT = `${APIS_BASE_URL}/finances`;

export const createProfit = async (profitData) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.post(
			`${FINANCES_ENDPOINT}/profit`,
			profitData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error(
			"Error creating profit:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const getProfits = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${FINANCES_ENDPOINT}/profits`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const getProfitsByUserType = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(
			`${FINANCES_ENDPOINT}/profits/by-user-type`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching profits by user type:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const getHireProfits = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${FINANCES_ENDPOINT}/profits/hire`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching hire-related profits:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const createExpense = async (expenseData) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.post(
			`${FINANCES_ENDPOINT}/expense`,
			expenseData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error creating expense:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const getExpenses = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${FINANCES_ENDPOINT}/expenses`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch (error) {
		console.log(error);
	}
};
