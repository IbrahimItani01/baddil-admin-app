import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "./slices/auth.slice";
import userSlice from "./slices/user.slice";
import systemSlice from "./slices/system.slice";
import bartersSlice from "./slices/barters.slice";
import usersSlice from "./slices/users.slice";
import profitsSlice from "./slices/profits.slice";
import expensesSlice from "./slices/expenses.slice";
import tiersSlice from "./slices/tiers.slice";
import locationsSlice from "./slices/locations.slice";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const store = configureStore({
	reducer: {
		user: userSlice,
		auth: authSlice,
		system: systemSlice,
		barters: bartersSlice,
		users: usersSlice,
		expenses: expensesSlice,
		profits: profitsSlice,
		tiers: tiersSlice,
		locations: locationsSlice,
	},
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
