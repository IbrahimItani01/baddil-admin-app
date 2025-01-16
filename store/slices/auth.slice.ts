import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthFormState {
	email: string;
	password: string;
}

const initialState: AuthFormState = {
	email: "",
	password: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		setPassword(state, action: PayloadAction<string>) {
			state.password = action.payload;
		},

		resetForm(state) {
			state.email = "";
			state.password = "";
		},
	},
});

export const { setEmail, setPassword, resetForm } = authSlice.actions;
export default authSlice.reducer;
