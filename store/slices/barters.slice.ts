import { createSlice } from "@reduxjs/toolkit";

// Interfaces
export interface Location {
	name: string;
	latitude: number;
	longitude: number;
}

export interface Meetup {
	location: Location;
}

export interface User {
	email: string;
}

export interface Barter {
	id: string;
	user1: User;
	user2: User;
	meetup: Meetup;
	created_at: Date; // Added created_at field
}

export interface BartersState {
	bartersData: Barter[];
	locations: Record<string, Location>;
}

const initialState: BartersState = {
	bartersData: [],
	locations: {},
};

const bartersSlice = createSlice({
	name: "barters",
	initialState,
	reducers: {
		setBartersData(state, action: { payload: Barter[] }) {
			state.bartersData = action.payload;
			state.locations = action.payload.reduce((acc, barter) => {
				if (barter.meetup?.location) {
					const { name, latitude, longitude } = barter.meetup.location;
					acc[name] = { name, latitude, longitude }; // Include 'name' in the object
				}
				return acc;
			}, {} as Record<string, Location>);
		},

		addBarter(state, action: { payload: Barter }) {
			const newBarter = action.payload;
			state.bartersData.push(newBarter);
			if (newBarter.meetup?.location) {
				const { name, latitude, longitude } = newBarter.meetup.location;
				state.locations[name] = { name, latitude, longitude }; // Include 'name'
			}
		},

		deleteBarter(state, action: { payload: string }) {
			const barterId = action.payload;
			state.bartersData = state.bartersData.filter(
				(barter) => barter.id !== barterId
			);
			state.locations = state.bartersData.reduce((acc, barter) => {
				if (barter.meetup?.location) {
					const { name, latitude, longitude } = barter.meetup.location;
					acc[name] = { name, latitude, longitude }; // Include 'name'
				}
				return acc;
			}, {} as Record<string, Location>);
		},

		updateLocation(state, action: { payload: Location }) {
			const { name } = action.payload;
			if (state.locations[name]) {
				state.locations[name] = action.payload; // Use the entire payload as is
			}
		},
	},
});

export const { setBartersData, addBarter, deleteBarter, updateLocation } =
	bartersSlice.actions;

export default bartersSlice.reducer;
