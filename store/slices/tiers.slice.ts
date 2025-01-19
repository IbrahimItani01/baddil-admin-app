import { createSlice } from "@reduxjs/toolkit";

export interface Tier {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	requirement: number;
}

interface TiersState {
	tiersData: Tier[];
}

const initialState: TiersState = {
	tiersData: [],
};

const tiersSlice = createSlice({
	name: "tiers",
	initialState,
	reducers: {
		setTiersData(state, action: { payload: Tier[] }) {
			state.tiersData = action.payload;
		},
		addTier(state, action: { payload: Tier }) {
			state.tiersData.push(action.payload);
		},
		deleteTier(state, action: { payload: string }) {
			state.tiersData = state.tiersData.filter(
				(tier) => tier.id !== action.payload
			);
		},
		editTierReducer(
			state,
			action: { payload: { id: string; updatedTier: Partial<Tier> } }
		) {
			const { id, updatedTier } = action.payload;
			const index = state.tiersData.findIndex((tier) => tier.id === id);
			if (index !== -1) {
				state.tiersData[index] = {
					...state.tiersData[index],
					...updatedTier,
				};
			}
		},
	},
});

export const { setTiersData, addTier, deleteTier, editTierReducer } =
	tiersSlice.actions;
export default tiersSlice.reducer;
