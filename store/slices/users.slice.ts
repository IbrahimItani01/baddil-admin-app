import { createSlice } from "@reduxjs/toolkit";

interface UserType {
	id: string;
	type: string;
}

interface UserStatus {
	id: string;
	status: string;
}

interface Settings {
	id: string;
	preference: string;
}

interface Subscription {
	id: string;
	plan: string;
}

export interface User {
	id: string;
	name: string;
	profile_picture: string | null;
	email: string;
	password: string;
	firebase_uid: string | null;
	device_token: string | null;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
	user_type: UserType;
	user_status: UserStatus;
	settings: Settings;
	subscription: Subscription;
}

interface UsersState {
	usersData: Record<string, User[]>;
}

const initialState: UsersState = {
	usersData: {},
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsersData(state, action: { payload: Record<string, User[]> }) {
			state.usersData = action.payload;
		},
		addUser(state, action: { payload: { userType: string; user: User } }) {
			const { userType, user } = action.payload;
			if (!state.usersData[userType]) {
				state.usersData[userType] = [];
			}
			state.usersData[userType].push(user);
		},
		deleteUser(
			state,
			action: { payload: { userType: string; userId: string } }
		) {
			const { userType, userId } = action.payload;
			if (state.usersData[userType]) {
				state.usersData[userType] = state.usersData[userType].filter(
					(user) => user.id !== userId
				);
			}
		},
		editUser(
			state,
			action: {
				payload: {
					userType: string;
					userId: string;
					updatedUser: Partial<User>;
				};
			}
		) {
			const { userType, userId, updatedUser } = action.payload;
			if (state.usersData[userType]) {
				const userIndex = state.usersData[userType].findIndex(
					(user) => user.id === userId
				);
				if (userIndex !== -1) {
					state.usersData[userType][userIndex] = {
						...state.usersData[userType][userIndex],
						...updatedUser,
					};
				}
			}
		},
	},
});

export const { setUsersData, addUser, deleteUser, editUser } =
	usersSlice.actions;
export default usersSlice.reducer;
