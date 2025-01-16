import { createSlice } from "@reduxjs/toolkit";
import { UserStatusEnum } from "../../lib/utils/enums.utils";

interface UserState {
	isLoggedIn: boolean;
	userName: string | null;
	profilePictureUrl: string;
	status: UserStatusEnum;
	email: string;
}

const initialState: UserState = {
	isLoggedIn: false,
	userName: "",
	profilePictureUrl: "",
	status: UserStatusEnum.Active,
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
		},
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setEmail(state, action) {
			state.email = action.payload;
		},
		setProfilePictureUrl(state, action) {
			state.profilePictureUrl = action.payload;
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
});

export const {
	login,
	logout,
	setUserName,
	setProfilePictureUrl,
	setStatus,
	setEmail,
} = userSlice.actions;
export default userSlice.reducer;
