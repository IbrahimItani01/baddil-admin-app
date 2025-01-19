import dayjs from "dayjs";
import { Dispatch } from "redux";
import { getAllBarters } from "../../apis/routes/barters/barters.routes";
import { getAllLocations } from "../../apis/routes/locations/locations.routes";
import { getTiers } from "../../apis/routes/tiers/tiers.routes";
import {
	getExpenses,
	getProfits,
} from "../../apis/routes/company/finances/finances.routes";
import { setBartersData } from "../../store/slices/barters.slice";
import { fetchUsersByType } from "../../apis/routes/user/user.routes";
import { setUsersData } from "../../store/slices/users.slice";
import { setExpensesData } from "../../store/slices/expenses.slice";
import { setProfitsData } from "../../store/slices/profits.slice";
import { setTiersData } from "../../store/slices/tiers.slice";
import { setLocations } from "../../store/slices/locations.slice";

export const formatDate = (date: string) => {
	return dayjs(date).format("MMMM D, YYYY");
};

export const initializeApp = async (dispatch: Dispatch) => {
	try {
		const [
			bartersState,
			usersData,
			expensesData,
			profitsData,
			tiersData,
			locationsData,
		] = await Promise.all([
			getAllBarters(),
			fetchUsersByType(),
			getExpenses(),
			getProfits(),
			getTiers(),
			getAllLocations(),
		]);

		// Dispatch actions based on the retrieved data
		if (tiersData) dispatch(setTiersData(tiersData));
		if (profitsData) dispatch(setProfitsData(profitsData));
		if (expensesData) dispatch(setExpensesData(expensesData));
		if (usersData) dispatch(setUsersData(usersData));
		if (bartersState && bartersState.bartersData)
			dispatch(setBartersData(bartersState.bartersData));
		if (locationsData) dispatch(setLocations(locationsData));
	} catch (e) {
		console.error(e);
	}
};
