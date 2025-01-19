import { createSlice } from "@reduxjs/toolkit";


export enum ProfitSource {
	SUBSCRIPTION = "subscription",
	HIRE_BUDGET = "hire_budget",
}


export interface Profit {
	id: string;
	created_at: Date;
	updated_at: Date;
	amount: number;
	source: ProfitSource;
	date: string;
}

export interface ProfitsState {
	profitsData: Profit[];
}


const initialState: ProfitsState = {
	profitsData: [],
};


const profitsSlice = createSlice({
	name: "profits",
	initialState,
	reducers: {
		setProfitsData(state, action: { payload: Profit[] }) {
			state.profitsData = action.payload;
		},
		addProfit(state, action: { payload: Profit }) {
			state.profitsData.push(action.payload);
		},
		deleteProfit(state, action: { payload: string }) {
			state.profitsData = state.profitsData.filter(
				(profit) => profit.id !== action.payload
			);
		},
		editProfit(
			state,
			action: { payload: { id: string; updatedProfit: Partial<Profit> } }
		) {
			const { id, updatedProfit } = action.payload;
			const index = state.profitsData.findIndex((profit) => profit.id === id);
			if (index !== -1) {
				state.profitsData[index] = {
					...state.profitsData[index],
					...updatedProfit,
				};
			}
		},
	},
});


export const { setProfitsData, addProfit, deleteProfit, editProfit } =
	profitsSlice.actions;
export default profitsSlice.reducer;
