import axios from "axios";
import { APIS_BASE_URL } from "../../../main";
import { Expense } from "../../../../store/slices/expenses.slice";
import { Profit } from "../../../../store/slices/profits.slice";

const FINANCES_ENDPOINT = `${APIS_BASE_URL}/finances`;

const getAuthToken = () => localStorage.getItem("token");

export const createProfit = async (profitData: Profit): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
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
	} catch {
		return false;
	}
};

export const getProfits = async (): Promise<Profit[] | false> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${FINANCES_ENDPOINT}/profits`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch {
		return false;
	}
};

export const getProfitsByUserType = async (): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(
			`${FINANCES_ENDPOINT}/profits/by-user-type`,
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

export const getHireProfits = async (): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${FINANCES_ENDPOINT}/profits/hire`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch {
		return false;
	}
};

export const createExpense = async (expenseData: Expense): Promise<unknown> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
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
	} catch {
		return false;
	}
};

export const getExpenses = async (): Promise<Expense[] | false> => {
	try {
		const token = getAuthToken();
		if (!token) return false;
		const response = await axios.get(`${FINANCES_ENDPOINT}/expenses`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch {
		return false;
	}
};
