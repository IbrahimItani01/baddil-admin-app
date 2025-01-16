import axios from "axios";
import { APIS_BASE_URL } from "../../main";
import { login, setEmail, setUserName } from "../../../store/slices/user.slice";

export const loginUser = async (
	dispatch: any,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${APIS_BASE_URL}/auth/login`, {
			emailOrIdToken: email,
			password,
		});
		const { token, user } = response.data.data;
		await dispatch(setUserName(user.name))
		await dispatch(setEmail(user.email))
		await dispatch(login())
		localStorage.setItem("token", token);
		// TODO: replace with success pop up from nextui
	} catch (error) {
		// TODO: replace with error pop up from nextui
		console.log(error)
	}
};

export const sendForgetPasswordEmail = async (email: string) => {
	try {
		const response = await axios.post(
			`${APIS_BASE_URL}/firebase/reset-password`,
			{
				email,
			}
		);
		if (response.data.success) {
			// TODO: replace with success pop up from nextui

			return true;
		}
	} catch (error) {
		// TODO: replace with error pop up from nextui
		console.error(error);
		return false;
	}
};
