import axios from "axios";
import { APIS_BASE_URL } from "../../../main"; // Ensure this contains your base API URL
import { Expense } from "../../../../store/slices/expenses.slice";
import { Profit } from "../../../../store/slices/profits.slice";

const FINANCES_ENDPOINT = `${APIS_BASE_URL}/finances`;

export const createProfit = async (profitData: Profit) => {
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
		console.error(error);
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
		return response.data.data;
	} catch (error) {
		console.error(error);
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
		console.error(error);
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
		console.error(error);
	}
};

export const createExpense = async (expenseData: Expense) => {
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
		console.error(error);
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
		console.error(error);
	}
};
