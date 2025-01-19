import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { login, setEmail, setUserName } from "../../../store/slices/user.slice";
import { Dispatch } from "redux";

export const loginUser = async (
	dispatch: Dispatch,
	email: string,
	password: string
): Promise<boolean> => {
	try {
		const response = await axios.post(`${APIS_BASE_URL}/auth/login`, {
			emailOrIdToken: email,
			password,
		});
		const { token, user } = response.data.data;
		dispatch(setUserName(user.name));
		dispatch(setEmail(user.email));
		dispatch(login());
		localStorage.setItem("token", token);
		return true;
	} catch {
		return false;
	}
};

export const sendForgetPasswordEmail = async (
	email: string
): Promise<boolean> => {
	try {
		const response = await axios.post(
			`${APIS_BASE_URL}/firebase/reset-password`,
			{ email }
		);
		return response.data.success;
	} catch {
		return false;
	}
};
